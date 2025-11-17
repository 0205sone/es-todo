// src/components/TourEventDashboard.tsx
import React, { useState, useEffect } from 'react';
import { TourTask } from '../types';
import { calculateTimeRemaining } from '../data/utils';
import { TourTaskList } from './TourTaskList';

// ツアーイベの初期タスク（30日分）を生成する
const createInitialTourTasks = (): TourTask[] => {
  return Array.from({ length: 30 }, (_, index) => ({
    day: index + 1,
    completed: false,
    stars: 0,
  }));
};

interface Props {
  endDate: string;
  onBack: () => void;
}

export function TourEventDashboard({ endDate, onBack }: Props) {
  // --- ツアーイベ画面の「状態 (State)」 ---
  const [tasks, setTasks] = useState<TourTask[]>(createInitialTourTasks);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(endDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(endDate));
    }, 60000);
    return () => clearInterval(interval);
  }, [endDate]);

  // --- ロジック (計算) ---
  const completedTasks = tasks.filter(task => task.completed).length;
  const remainingTasks = 30 - completedTasks;
  const totalStars = tasks.reduce((sum, task) => sum + task.stars, 0);

  // --- イベントハンドラ (タスクの状態を変更する) ---
  const handleTaskChange = (day: number, completed: boolean, stars: 0 | 1 | 2 | 3) => {
    setTasks(currentTasks => 
      currentTasks.map(task => 
        task.day === day ? { ...task, completed, stars } : task
      )
    );
  };

  return (
    <div>
      <button onClick={onBack}>← イベント選択に戻る</button>
      <h3>ツアーイベント進捗</h3>

      {/* 1. 進捗表示エリア */}
      <div>
        <p><strong>{timeRemaining}</strong></p>
        <p>残りのツアー: <strong>あと {remainingTasks} 日</strong></p>
        <p>合計獲得星数: <strong>★ {totalStars}</strong></p>
      </div>

      {/* 2. タスクリスト (新規作成) */}
      <TourTaskList tasks={tasks} onTaskChange={handleTaskChange} />
    </div>
  );
}