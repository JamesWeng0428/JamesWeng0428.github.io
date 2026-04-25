export interface Project {
	title: string;
	year: string;
	url: string | null;
	desc: string;
	tags: string[];
}

export const projects: Project[] = [
	{
		title: 'Spray',
		year: '2026 — Now',
		url: 'https://spray.cruxbeta.dev/',
		desc: 'Maintainer of a bouldering web platform providing comprehensive climbing beta, route information, and community-driven content for climbers.',
		tags: ['Web', 'Climbing'],
	},
	{
		title: 'OhMyTSS',
		year: '2025 — Now',
		url: 'https://github.com/GodisinHisHeaven/ohMyTss/tree/main',
		desc: 'iOS app built in Swift that integrates HealthKit to transform wearable workout data into readiness and training-load insights, using an on-device, privacy-first architecture.',
		tags: ['Swift', 'iOS', 'HealthKit'],
	},
	{
		title: 'Meeting Minion',
		year: '2025 — 2026',
		url: 'https://github.com/JamesWeng0428/Meeting-Minion',
		desc: 'End-to-end AI web app for automated meeting transcription and summarization. Led a cross-functional team; integrated WhisperX, Ollama LLM, Streamlit UI, and SQLite. 64+ pytest tests at 100% pass rate.',
		tags: ['Python', 'WhisperX', 'LLM', 'Streamlit'],
	},
	{
		title: 'AI News Reporter',
		year: '2025 — Now',
		url: 'https://github.com/JamesWeng0428/AI-news-reporter',
		desc: 'Personal AI agent that fetches news and YouTube video summaries and delivers them via Telegram on a cron schedule. Runs a local Ollama LLM for privacy; supports natural-language config through the bot.',
		tags: ['Python', 'Ollama', 'Telegram', 'Automation'],
	},
	{
		title: 'Seizure Prediction Bracelet',
		year: '2022 — 2024',
		url: null,
		desc: 'Wearable seizure-prediction device built for my brother, combining advanced sensors and ML to analyze real-time biometric data and deliver timely alerts.',
		tags: ['C++', 'Machine Learning', 'Embedded Systems'],
	},
	{
		title: 'Derivation Graph Builder',
		year: '2025 — Now',
		url: 'https://github.com/MLPgroup/Derivation-Tree',
		desc: 'Heuristic pipeline for extracting math equation derivation graphs from arXiv papers. Part of the URSA Mathematical Derivation Graphs Dataset project targeting a top-tier conference.',
		tags: ['Python', 'NLP', 'Research'],
	},
];
