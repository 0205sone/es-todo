// src/components/TourTaskList.tsx
import React from 'react';
import { TourTask } from '../types';

interface Props {
  tasks: TourTask[];
  onTaskChange: (day: number, completed: boolean, stars: 0 | 1 | 2 | 3) => void;
}

export function TourTaskList({ tasks, onTaskChange }: Props) {
  return (
    // <details> タグで折りたたみを実装
    <details>
      <summary>ツアー進捗 (30日分)</summary>
      <div>
        {tasks.map(task => (
          <div key={task.day}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => {
                  const newCompleted = e.target.checked;
                  // チェックを外したら星を0に戻す
                  const newStars = newCompleted ? task.stars : 0;
                  onTaskChange(task.day, newCompleted, newStars);
                }}
              />
              Day {task.day}
            </label>
            
            {/* タスク完了時のみ星の選択肢を表示 */}
            {task.completed && (
              <select 
                value={task.stars} 
                onChange={(e) => onTaskChange(task.day, true, Number(e.target.value) as 0 | 1 | 2 | 3)}
                style={{ marginLeft: '10px' }}
              >
                <option value={0}>★0</option>
                <option value={1}>★1</option>
                <option value={2}>★2</option>
                <option value={3}>★3</option>
              </select>
            )}
          </div>
        ))}
      </div>
    </details>
  );
}