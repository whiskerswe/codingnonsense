export type StoryConfig = {
	start: number;
	ending: number;
	numberOfChapters: number;
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
		this.consumedPoolEntries = new Set<number>();
		this.consumedPoolEntries.add(config.start);
	}
	
	canAdvance(): boolean {
		const forcedAfterEnding = this.config.sequences.get(this.config.ending);
		const final = forcedAfterEnding ?? this.config.ending;
		
		return !this.consumedPoolEntries.has(final);
	}
	
	private computeNextChapter(){
		const forced = this.config.sequences.get(this.currentChapter);
		if (forced !== undefined) {
			return forced;
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
		return next;
	}
	
}
