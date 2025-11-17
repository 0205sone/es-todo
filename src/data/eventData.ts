// src/data/eventData.ts
import { SongMilestone, SongGoal } from '../types';

/**
 * 報酬カードと枚数から、必要ポイントを引くためのデータマップ
 * (いただいた画像のデータ)
 */
const pointTargets = {
  // 0枚目(0pt)をインデックス0に設定
  star3_1: [0, 80000, 440000, 850000, 1150000, 1600000],
  star3_2: [0, 320000, 550000, 900000, 1400000, 1900000],
  star4: [0, 1000000, 2400000, 3300000, 5000000, 10200000],
  star5: [0, 3500000, 7500000, 11000000, 15000000, 22000000],
};

/**
 * 曲イベントの全報酬マイルストーン（タスク）のマスターリスト
 * (画像データをポイント順にソート)
 */
const ALL_SONG_MILESTONES: SongMilestone[] = [
  { id: 'm1', points: 80000, name: '⭐3① 1枚目' },
  { id: 'm2', points: 320000, name: '⭐3② 1枚目' },
  { id: 'm3', points: 440000, name: '⭐3① 2枚目' },
  { id: 'm4', points: 550000, name: '⭐3② 2枚目' },
  { id: 'm5', points: 850000, name: '⭐3① 3枚目' },
  { id: 'm6', points: 900000, name: '⭐3② 3枚目' },
  { id: 'm7', points: 1000000, name: '⭐4 1枚目' },
  { id: 'm8', points: 1150000, name: '⭐3① 4枚目' },
  { id: 'm9', points: 1400000, name: '⭐3② 4枚目' },
  { id: 'm10', points: 1600000, name: '⭐3① 5枚目' },
  { id: 'm11', points: 1900000, name: '⭐3② 5枚目' },
  { id: 'm12', points: 2400000, name: '⭐4 2枚目' },
  { id: 'm13', points: 3300000, name: '⭐4 3枚目' },
  { id: 'm14', points: 3500000, name: '⭐5 1枚目' },
  { id: 'm15', points: 5000000, name: '⭐4 4枚目' },
  { id: 'm16', points: 7500000, name: '⭐5 2枚目' },
  { id: 'm17', points: 10200000, name: '⭐4 5枚目' },
  { id: 'm18', points: 11000000, name: '⭐5 3枚目' },
  { id: 'm19', points: 15000000, name: '⭐5 4枚目' },
  { id: 'm20', points: 22000000, name: '⭐5 5枚目' },
];

/**
 * ユーザーが設定した目標（各カード何枚）から、
 * 最終的に必要なポイント（最大値）を計算する関数
 */
export const getFinalTargetPoints = (goal: SongGoal): number => {
  const p1 = pointTargets.star3_1[goal.star3_1];
  const p2 = pointTargets.star3_2[goal.star3_2];
  const p3 = pointTargets.star4[goal.star4];
  const p4 = pointTargets.star5[goal.star5];
  return Math.max(p1, p2, p3, p4);
};

/**
 * 最終目標ポイントをもとに、達成すべきタスク（マイルストーン）のリストを
 * 自動で生成（フィルタリング）する関数
 */
export const getMilestonesForGoal = (
  goal: SongGoal,
): SongMilestone[] => {
  const finalPoints = getFinalTargetPoints(goal);
  if (finalPoints === 0) {
    return []; // 目標が設定されていない
  }
  // 全マイルストーンリストから、最終目標ポイント以下のものだけをフィルタリング
  return ALL_SONG_MILESTONES.filter(
    (milestone) => milestone.points <= finalPoints
  );
};