export interface Project {
	title: string;
	description: string;
	why: string;
	url: string | null;
	tags: string[];
	period: string;
}

export const tagColors: Record<string, string> = {
	Swift: '#f05138',
	iOS: '#147efb',
	HealthKit: '#34c759',
	Python: '#3776ab',
	WhisperX: '#8b5cf6',
	LLM: '#ec4899',
	Streamlit: '#ff4b4b',
	'C++': '#00599c',
	'Machine Learning': '#f59e0b',
	'Embedded Systems': '#10b981',
	NLP: '#4f5bd5',
	Research: '#4f5bd5',
};

export const projects: Project[] = [
	{
		title: 'OhMyTSS',
		description:
			'iOS app built in Swift that integrates HealthKit to transform wearable workout data into readiness and training-load insights, using an on-device, privacy-first architecture.',
		why: 'I wanted athletes to get useful training feedback without giving away their private health data.',
		url: 'https://github.com/GodisinHisHeaven/ohMyTss/tree/main',
		tags: ['Swift', 'iOS', 'HealthKit'],
		period: 'Nov 2025 – Present',
	},
	{
		title: 'Meeting Minion',
		description:
			'End-to-end AI web app for automated meeting transcription and summarization. Led a cross-functional team; integrated WhisperX, Ollama LLM, Streamlit UI, and SQLite. 64+ pytest tests at 100% pass rate.',
		why: 'Teams waste too much momentum when great conversations disappear right after the meeting ends.',
		url: 'https://github.com/JamesWeng0428/Meeting-Minion',
		tags: ['Python', 'WhisperX', 'LLM', 'Streamlit'],
		period: 'Aug 2025 – Jan 2026',
	},
	{
		title: 'Seizure Prediction Bracelet',
		description:
			'Wearable seizure-prediction device built for my brother, combining advanced sensors and machine learning to analyze real-time biometric data and deliver timely alerts.',
		why: 'I wanted my family to feel less helpless and give my brother earlier warnings in daily life.',
		url: null,
		tags: ['C++', 'Machine Learning', 'Embedded Systems'],
		period: '2022 – 2024',
	},
	{
		title: 'Derivation Graph Builder',
		description:
			'Heuristic pipeline for extracting math equation derivation graphs from arXiv papers. Part of the URSA Mathematical Derivation Graphs Dataset project targeting a top-tier conference.',
		why: 'Teaching models to reason about how equations derive from each other — the structure that textbooks hide in plain sight.',
		url: 'https://github.com/MLPgroup/Derivation-Tree',
		tags: ['Python', 'NLP', 'Research'],
		period: '2025 – Present',
	},
];
