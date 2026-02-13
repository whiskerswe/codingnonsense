type StoryConfig = {
	start: number;
	endings: readonly number[];
	pool: readonly number[];
}

export class StoryEngine {
	private currentChapter: number;
	private readChapters = new Set<number>();
	private config;
	private maxEndSteps = 2;
	private endCount = 0;
	
	constructor(config: StoryConfig) {
		this.config = config;
		this.currentChapter = config.start;
		this.readChapters = this.readChapters.add(config.start);
		
	}
	
	getCurrentChapter() {
		return this.currentChapter;
	}
	
	nextChapter() {
		const remainingChapters = this.config.pool.filter(
			c => !this.readChapters.has(c)
		);
		if (remainingChapters.length === 0) {
			if (this.endCount >= this.maxEndSteps) {
				return this.currentChapter;
			}
			this.currentChapter = this.config.endings[this.endCount++];
			return this.currentChapter;
		}
		const ran = Math.floor(Math.random() * remainingChapters.length);
		const next =
			remainingChapters[ran];
		
		this.readChapters.add(next);
		this.currentChapter = next;
		return next;
	}
}
