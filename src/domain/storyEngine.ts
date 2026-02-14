export type StoryConfig = {
	start: number;
	ending: number;
	randomPool: readonly number[];
	sequences: ReadonlyMap<number, number>;
}

export class StoryEngine {
	currentChapter: number;
	consumedPoolEntries = new Set<number>();
	private config;
	
	constructor(
		config: StoryConfig
	) {
		this.config = config;
		this.currentChapter = config.start;
		this.consumedPoolEntries = this.consumedPoolEntries.add(config.start);
	}
	
	getCurrentChapter() {
		return this.currentChapter;
	}
	
	nextChapter() {
		const forcedChapter = this.config.sequences.get(this.currentChapter);
		if (forcedChapter !== undefined) {
			this.currentChapter = forcedChapter;
			return this.currentChapter;
		}
		const remainingChapters = this.config.randomPool.filter(
			c => !this.consumedPoolEntries.has(c)
		);
		
		if (remainingChapters.length === 0) {
			this.currentChapter = this.config.ending;
			return this.currentChapter;
		}
		
		const ran = Math.floor(Math.random() * remainingChapters.length);
		const next =
			remainingChapters[ran];
		this.consumedPoolEntries.add(next);
		this.currentChapter = next;
		return next;
	}
	
}
