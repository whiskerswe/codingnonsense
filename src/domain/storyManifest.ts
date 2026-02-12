export const storyManifest = {
	start: 3,
	endings: [22, 23],
	pool: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 19, 21, 39],
};

export const usedChapterIds = [
	storyManifest.start,
	...storyManifest.endings,
	...storyManifest.pool,
];