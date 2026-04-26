import type { SequenceConfig, StoryConfig } from "./engineConfig.ts";


export class StoryEngine {
	currentChapter: number;
	consumedPoolEntries = new Set<number>();
	private config;
	private chapterQueue: number[];
	private endingQueue: number[];
	
	constructor(
		config: StoryConfig
	) {
		this.config = config;
		this.currentChapter = config.startChapterId;
		this.consumedPoolEntries = new Set<number>();
		this.consumedPoolEntries.add(config.startChapterId);
		this.chapterQueue = [];
		this.endingQueue = [...config.endChapterIds]
	}
	
	canAdvance(): boolean {
		return this.endingQueue.length > 0;
	}
	
	private computeNextChapter(){
		if (this.chapterQueue.length > 0) {
			return this.chapterQueue.shift()!;
		}
		
		const maxChaptersRead = this.consumedPoolEntries.size >= this.config.maxNumberOfChapters;
		
		const remaining = this.config.randomChapterPool.filter(
			c => !this.consumedPoolEntries.has(c)
		);
		
		if (remaining.length === 0 || maxChaptersRead) {
			return this.endingQueue.shift()!;
		}
		
		const newChapterId = remaining[Math.floor(Math.random() * remaining.length)];
		this.addChaptersToQueue(newChapterId);
		if (this.chapterQueue.length > 0) {
			return this.chapterQueue.shift()!;
		}
		return newChapterId;
	}
	
	nextChapter() {
		const next = this.computeNextChapter();
		this.consumedPoolEntries.add(next);
		this.currentChapter = next;
		return next;
	}
	
	addChaptersToQueue(newChapterId: number) {
		const sequence = this.config.chapterSequences[newChapterId];
		if (!sequence) return;
		const chapters = this.resolveChapters(newChapterId, sequence);
		
		this.chapterQueue.push(...chapters);
		chapters.forEach(c => this.consumedPoolEntries.add(c));
	}
	
	private resolveChapters(newChapterId: number, sequence: SequenceConfig): number[] {
		const data = [newChapterId].concat(sequence.chapters);
		return sequence.mode === "random"
			? this.shuffleAndTake(data)
			: data;
	}
	
	shuffleAndTake<T>(
		arr: T[],
		min = 2,
		max = arr.length
	): T[] {
		const shuffled = [...arr]
		
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
		}
		
		const count =
			Math.floor(Math.random() * (max - min + 1)) + min
		
		return shuffled.slice(0, count)
	}
	
}
