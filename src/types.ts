// src/types.ts

/** イベントの種類 */
export type EventType = 'none' | 'song' | 'tour';

/** 曲イベの報酬マイルストーン（タスク）の型 */
export interface SongMilestone {
  id: string;
  points: number; // 達成に必要なポイント
  name: string;   // 報酬名 (例: '⭐3① 1枚目')
}

/** ツアーイベのタスクの型 */
export interface TourTask {
  day: number;
  completed: boolean;
  stars: 0 | 1 | 2 | 3; // 獲得した星の数
}

/** 曲イベの目標（何枚取るか）の型 */
export interface SongGoal {
  star5: number;
  star4: number;
  star3_1: number;
  star3_2: number;
}