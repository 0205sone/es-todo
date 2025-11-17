// src/components/SongGoalSelector.tsx
import React from 'react';
import { SongGoal } from '../types';

interface Props {
  goal: SongGoal;
  onGoalChange: (newGoal: SongGoal) => void;
}

// 選択肢用の配列 [0, 1, 2, 3, 4, 5]
const cardAmountOptions = [0, 1, 2, 3, 4, 5];

export function SongGoalSelector({ goal, onGoalChange }: Props) {
  // セレクトボックス（ドロップダウン）の値が変更されたときの処理
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    cardType: keyof SongGoal // 'star5', 'star4' など
  ) => {
    onGoalChange({
      ...goal,
      [cardType]: Number(e.target.value),
    });
  };

  return (
    <fieldset>
      <legend>イベント目標設定</legend>
      <div>
        <label>
          ⭐5:
          <select value={goal.star5} onChange={(e) => handleChange(e, 'star5')}>
            {cardAmountOptions.map((num) => (
              <option key={num} value={num}>{num}枚</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          ⭐4:
          <select value={goal.star4} onChange={(e) => handleChange(e, 'star4')}>
            {cardAmountOptions.map((num) => (
              <option key={num} value={num}>{num}枚</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          ⭐3①:
          <select value={goal.star3_1} onChange={(e) => handleChange(e, 'star3_1')}>
            {cardAmountOptions.map((num) => (
              <option key={num} value={num}>{num}枚</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          ⭐3②:
          <select value={goal.star3_2} onChange={(e) => handleChange(e, 'star3_2')}>
            {cardAmountOptions.map((num) => (
              <option key={num} value={num}>{num}枚</option>
            ))}
          </select>
        </label>
      </div>
    </fieldset>
  );
}