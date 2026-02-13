export const storyManifest = {
	start: 3,
	endings: [22, 23],
	pool: [0, 1, 2, 4, 19, 21, 39],
};

export const usedChapterIds = [
	storyManifest.start,
	...storyManifest.endings,
	...storyManifest.pool,
];