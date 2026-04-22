export type StoryConfig = {
	start: number;
	ending: number;
	numberOfChapters: number;
	randomPool: readonly number[];
	sequences: ReadonlyMap<number, number[]>;
}

export class StoryEngine {
	currentChapter: number;
	consumedPoolEntries = new Set<number>();
	private config;
	private chapterQueue: number[];
	
	constructor(
		config: StoryConfig
	) {
		this.config = config;
		this.currentChapter = config.start;
		this.consumedPoolEntries = new Set<number>();
		this.consumedPoolEntries.add(config.start);
		this.chapterQueue = [];
	}
	
	canAdvance(): boolean {
		if (this.chapterQueue.length > 0) return true;
		// Last chapter is always 23. Can be found in storyConfig, but
		// this is OK to save some logic.
		return !this.consumedPoolEntries.has(23);
	}
	
	private computeNextChapter(){
		
		if (this.chapterQueue.length > 0) {
			return this.chapterQueue.shift()!;
		}
		
		const maxChaptersRead = this.consumedPoolEntries.size >= this.config.numberOfChapters;
		
		const remaining = this.config.randomPool.filter(
			c => !this.consumedPoolEntries.has(c)
		);
		
		if (remaining.length === 0 || maxChaptersRead) {
			return this.config.ending;
		}
		
		return remaining[Math.floor(Math.random() * remaining.length)];
	}
	
	
	nextChapter() {
		const next = this.computeNextChapter();
		this.consumedPoolEntries.add(next);
		this.currentChapter = next;
		const queue = this.config.sequences.get(this.currentChapter);
		if (queue !== undefined) {
			this.chapterQueue.push(...queue);
		}
		return next;
	}
	
}
