import type { SequenceConfig, StoryConfig } from "./storyDefinition.ts";
import { shuffleAndTake } from "./shuffling.ts";


export class StoryEngine {
	currentChapter: number;
	readonly excludedChapters: Set<number>;
	private config: StoryConfig;
	private chaptersToRead: number[];
	private endingQueue: number[];
	
	constructor(
		config: StoryConfig
	) {
		this.config = config;
		this.currentChapter = config.startChapterId;
		this.excludedChapters = new Set<number>();
		this.excludedChapters.add(config.startChapterId);
		this.chaptersToRead = [];
		this.endingQueue = [...config.endChapterIds]
	}
	
	canAdvance(): boolean {
		return this.endingQueue.length > 0;
	}
	
	nextChapter() {
		const next = this.computeNextChapter();
		this.excludedChapters.add(next);
		this.currentChapter = next;
		return next;
	}
	
	private computeNextChapter(){
		if (this.chaptersToRead.length > 0) {
			return this.takeQueuedChapter();
		}
		
		if (this.shouldEnd()) {
			return this.endingQueue.shift()!;
		}
		
		const newChapterId = this.pickRandomChapter();
		
		const sequence = this.config.chapterSequences[newChapterId];
		if (sequence) {
			this.applyChapterSequence(newChapterId, sequence);
			return this.takeQueuedChapter();
		}
		
		return newChapterId;
	}
	
	private pickRandomChapter(): number {
		const remaining = this.getRemainingChapters();
		
		return remaining[Math.floor(Math.random() * remaining.length)];
	}
	
	private shouldEnd(): boolean {
		const maxReached =
			this.excludedChapters.size >= this.config.maxNumberOfChapters;
		const remaining = this.getRemainingChapters();
		
		return remaining.length === 0 || maxReached;
	}
	
	private getRemainingChapters(): number[] {
		return this.config.randomChapterPool.filter(
			c => !this.excludedChapters.has(c)
		);
	}
	
	private takeQueuedChapter(): number {
		return this.chaptersToRead.shift()!;
	}
	
	private applyChapterSequence(newChapterId: number, sequence: SequenceConfig): void {
		const newChaptersSequence = this.generateChapterSequence(newChapterId, sequence);
		this.chaptersToRead.push(...newChaptersSequence);
		newChaptersSequence.forEach(c => this.excludedChapters.add(c));
	}
	
	private generateChapterSequence(newChapterId: number, sequence: SequenceConfig): number[] {
		const data = [newChapterId].concat(sequence.chapters);
		return sequence.mode === "random"
			? shuffleAndTake(data)
			: data;
	}
}
