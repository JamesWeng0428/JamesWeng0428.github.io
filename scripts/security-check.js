#!/usr/bin/env node
/**
 * Security check script for Astro build output
 * Validates CSP, security headers, and link attributes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '..', 'dist');
const ERRORS = [];
const WARNINGS = [];

// Colors for terminal output
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

function error(msg) {
	ERRORS.push(msg);
	console.log(`${RED}✗${RESET} ${msg}`);
}

function warning(msg) {
	WARNINGS.push(msg);
	console.log(`${YELLOW}⚠${RESET} ${msg}`);
}

function success(msg) {
	console.log(`${GREEN}✓${RESET} ${msg}`);
}

function info(msg) {
	console.log(`${CYAN}ℹ${RESET} ${msg}`);
}

// Recursively find all HTML files
function findHtmlFiles(dir, files = []) {
	const items = fs.readdirSync(dir, { withFileTypes: true });

	for (const item of items) {
		const fullPath = path.join(dir, item.name);
		if (item.isDirectory()) {
			findHtmlFiles(fullPath, files);
		} else if (item.name.endsWith('.html')) {
			files.push(fullPath);
		}
	}

	return files;
}

function checkCSP(html, filePath) {
	const cspMatch = html.match(/<meta[^>]*http-equiv="Content-Security-Policy"[^>]*>/i);
	if (!cspMatch) {
		error(`Missing CSP meta tag`);
		return false;
	}

	const cspContent = cspMatch[0].match(/content="([^"]*)"/i)?.[1] || '';
	const requiredDirectives = [
		'default-src',
		'script-src',
		'style-src',
		'img-src',
		'frame-src',
		'object-src',
	];

	const missing = requiredDirectives.filter((d) => !cspContent.includes(d));
	if (missing.length > 0) {
		warning(`CSP missing directives: ${missing.join(', ')}`);
	}

	// Check for frame-src none (clickjacking protection)
	if (!cspContent.includes("frame-src 'none'")) {
		warning(`CSP should include frame-src 'none' for clickjacking protection`);
	}

	success(`CSP configured with ${cspContent.split(';').length} directives`);
	return true;
}

function checkSecurityHeaders(html, filePath) {
	const headers = [
		{
			name: 'X-Frame-Options',
			pattern: /http-equiv="X-Frame-Options"[^>]*content="DENY"/i,
			desc: 'prevents clickjacking',
		},
		{
			name: 'X-Content-Type-Options',
			pattern: /http-equiv="X-Content-Type-Options"[^>]*content="nosniff"/i,
			desc: 'prevents MIME sniffing',
		},
		{
			name: 'Referrer-Policy',
			pattern: /http-equiv="Referrer-Policy"/i,
			desc: 'limits referrer leakage',
		},
		{
			name: 'Permissions-Policy',
			pattern: /http-equiv="Permissions-Policy"/i,
			desc: 'restricts browser features',
		},
	];

	let allPresent = true;
	for (const header of headers) {
		if (!header.pattern.test(html)) {
			error(`Missing ${header.name} (${header.desc})`);
			allPresent = false;
		}
	}

	if (allPresent) {
		success(`All 4 security headers present`);
	}
	return allPresent;
}

function checkExternalLinks(html, filePath) {
	// Find all links with target="_blank"
	const linkRegex = /<a[^>]*target="_blank"[^>]*>/gi;
	const links = [];
	let match;
	while ((match = linkRegex.exec(html)) !== null) {
		links.push(match[0]);
	}

	if (links.length === 0) {
		success(`No external links (target=_blank)`);
		return true;
	}

	let issues = 0;
	for (const link of links) {
		const hasNoopener = /rel="[^"]*noopener[^"]*"/i.test(link);
		const hasNoreferrer = /rel="[^"]*noreferrer[^"]*"/i.test(link);
		const hrefMatch = link.match(/href="([^"]*)"/i);
		const href = hrefMatch ? hrefMatch[1].substring(0, 50) : 'unknown';

		if (!hasNoopener || !hasNoreferrer) {
			const missing = [];
			if (!hasNoopener) missing.push('noopener');
			if (!hasNoreferrer) missing.push('noreferrer');
			error(`Link to "${href}..." missing rel="${missing.join(' ')}"`);
			issues++;
		}
	}

	if (issues === 0) {
		success(`${links.length} external link(s) properly secured with rel="noopener noreferrer"`);
	}

	return issues === 0;
}

function checkInlineHandlers(html, filePath) {
	// Check for inline event handlers
	const inlineHandlers = [
		'onclick',
		'onload',
		'onerror',
		'onmouseover',
		'onmouseout',
		'onkeydown',
		'onkeyup',
		'onsubmit',
		'onchange',
		'onfocus',
		'onblur',
	];

	const handlerPattern = new RegExp(`\\s(${inlineHandlers.join('|')})\\s*=`, 'gi');

	const matches = html.match(handlerPattern) || [];

	if (matches.length > 0) {
		const uniqueHandlers = [...new Set(matches.map((m) => m.trim().replace('=', '')))];
		warning(`${matches.length} inline event handler(s) found: ${uniqueHandlers.join(', ')}`);
		info(`   Note: CSP blocks these anyway, but better to use addEventListener`);
		return false;
	}

	success(`No inline event handlers`);
	return true;
}

function checkUnsafePatterns(html, filePath) {
	// Check for potential secrets in HTML
	const secretPatterns = [
		{ pattern: /api[_-]?key\s*[:=]\s*["'][a-zA-Z0-9]{16,}["']/i, name: 'API key' },
		{ pattern: /secret\s*[:=]\s*["'][a-zA-Z0-9]{16,}["']/i, name: 'Secret' },
		{ pattern: /password\s*[:=]\s*["'][^"']{4,}["']/i, name: 'Password' },
		{ pattern: /token\s*[:=]\s*["'][a-zA-Z0-9_-]{20,}["']/i, name: 'Token' },
		{ pattern: /sk-[a-zA-Z0-9]{20,}/i, name: 'OpenAI-style key' },
	];

	let foundSecrets = false;
	for (const { pattern, name } of secretPatterns) {
		if (pattern.test(html)) {
			error(`Potential ${name} exposure detected!`);
			foundSecrets = true;
		}
	}

	if (!foundSecrets) {
		success(`No exposed secrets detected`);
	}

	return !foundSecrets;
}

function checkGeneratorLeak(html, filePath) {
	// Check if generator meta reveals too much
	const generatorMatch = html.match(/<meta[^>]*name="generator"[^>]*>/i);
	if (generatorMatch) {
		const content = generatorMatch[0].match(/content="([^"]*)"/i)?.[1] || '';
		if (content.includes('Astro')) {
			info(`Generator reveals Astro (information disclosure)`);
			info(`   Consider removing: <meta name="generator" content="${content}">`);
			return false;
		}
	}
	return true;
}

function main() {
	console.log('🔒 Security Check for Astro Build\n');
	console.log('='.repeat(60));

	// Check if dist exists
	if (!fs.existsSync(DIST_DIR)) {
		console.error(`\n${RED}Error:${RESET} dist/ directory not found.`);
		console.error(`   Run 'npm run build' first.`);
		process.exit(1);
	}

	// Find all HTML files
	let htmlFiles;
	try {
		htmlFiles = findHtmlFiles(DIST_DIR);
	} catch (err) {
		console.error(`\n${RED}Error:${RESET} Failed to read dist/ directory: ${err.message}`);
		process.exit(1);
	}

	if (htmlFiles.length === 0) {
		console.error(`\n${RED}Error:${RESET} No HTML files found in dist/`);
		process.exit(1);
	}

	console.log(`\nFound ${CYAN}${htmlFiles.length}${RESET} HTML file(s) to check\n`);

	let totalPassed = 0;
	let totalChecks = 0;

	for (const file of htmlFiles) {
		const relativePath = path.relative(DIST_DIR, file);
		console.log(`\n📄 ${CYAN}${relativePath}${RESET}`);
		console.log('-'.repeat(60));

		let html;
		try {
			html = fs.readFileSync(file, 'utf-8');
		} catch (err) {
			error(`Failed to read file: ${err.message}`);
			continue;
		}

		const results = [
			checkCSP(html, relativePath),
			checkSecurityHeaders(html, relativePath),
			checkExternalLinks(html, relativePath),
			checkInlineHandlers(html, relativePath),
			checkUnsafePatterns(html, relativePath),
			checkGeneratorLeak(html, relativePath),
		];

		totalChecks += results.length;
		totalPassed += results.filter(Boolean).length;
	}

	// Summary
	console.log('\n' + '='.repeat(60));
	console.log('📊 SECURITY CHECK SUMMARY');
	console.log('='.repeat(60));

	const passRate = Math.round((totalPassed / totalChecks) * 100);

	if (ERRORS.length === 0 && WARNINGS.length === 0) {
		console.log(`\n${GREEN}✅ All security checks passed!${RESET}`);
		console.log(`   ${totalPassed}/${totalChecks} checks passed (${passRate}%)`);
		console.log(`\n${GREEN}Safe to deploy.${RESET}\n`);
		process.exit(0);
	} else {
		console.log(`\n${YELLOW}⚠️  Security check completed with issues${RESET}`);
		console.log(`   ${totalPassed}/${totalChecks} checks passed (${passRate}%)`);
		console.log(
			`   ${RED}${ERRORS.length} error(s)${RESET}, ${YELLOW}${WARNINGS.length} warning(s)${RESET}`,
		);

		if (ERRORS.length > 0) {
			console.log(`\n${RED}❌ ERRORS (must fix before deploy):${RESET}`);
			ERRORS.forEach((e, i) => console.log(`   ${i + 1}. ${e}`));
		}

		if (WARNINGS.length > 0) {
			console.log(`\n${YELLOW}⚠️  WARNINGS (recommended to fix):${RESET}`);
			WARNINGS.forEach((w, i) => console.log(`   ${i + 1}. ${w}`));
		}

		console.log('');
		process.exit(ERRORS.length > 0 ? 1 : 0);
	}
}

main();
