interface MediaVideo {
	type: 'video';
	src: string;
	poster: string;
}

interface MediaImage {
	type: 'image';
	src: string;
	alt: string;
}

interface HobbyStat {
	label: string;
	value: string;
}

export const boulderingMedia: MediaVideo[] = [
	{ type: 'video', src: '/bouldering-1.mp4', poster: '/bouldering-1-poster.jpg' },
	{ type: 'video', src: '/bouldering-2.mp4', poster: '/bouldering-2-poster.jpg' },
];

export const cyclingMedia: MediaImage[] = [
	{ type: 'image', src: '/cycling-1.JPG', alt: 'Cycling — ride 1' },
	{ type: 'image', src: '/cycling-2.JPG', alt: 'Cycling — ride 2' },
	{ type: 'image', src: '/cycling-3.JPG', alt: 'Cycling — ride 3' },
];

export const boulderingStats: HobbyStat[] = [
	{ label: 'Gym', value: 'Urbana Boulders' },
	{ label: 'Also', value: 'Boneyard' },
	{ label: 'Style', value: 'Problem solver' },
];

export const cyclingStats: HobbyStat[] = [
	{ label: 'Rig', value: 'GIANT Propel ADV SL' },
	{ label: 'Terrain', value: 'Road' },
	{ label: 'Track', value: 'Strava' },
];
