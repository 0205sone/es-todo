// src/App.tsx
import React, { useState } from 'react';
import { EventType } from './types';
import { EventSelection } from './components/EventSelection';
import { SongEventDashboard } from './components/SongEventDashboard';
import { TourEventDashboard } from './components/TourEventDashboard';

function App() {
  // --- 全体で管理する「状態 (State)」 ---
  // 1. どのイベント？ 'none' (未選択), 'song', 'tour'
  const [eventType, setEventType] = useState<EventType>('none');
  
  // 2. イベント期間
  const [startDate, setStartDate] = useState(''); // 'YYYY-MM-DDTHH:MM'
  const [endDate, setEndDate] = useState('');

  // --- 状態 (State) に応じて表示するコンポーネントを切り替える ---

  // 1. まだイベントが選択されていない時
  if (eventType === 'none') {
    return (
      <EventSelection
        onStart={(type, start, end) => {
          setEventType(type);
          setStartDate(start);
          setEndDate(end);
        }}
      />
    );
  }

  // 2. 曲イベが選択された時
  if (eventType === 'song') {
    return (
      <SongEventDashboard
        endDate={endDate}
        onBack={() => setEventType('none')} // 戻るボタン
      />
    );
  }

  // 3. ツアーイベが選択された時
  if (eventType === 'tour') {
    return (
      <TourEventDashboard
        endDate={endDate}
        onBack={() => setEventType('none')} // 戻るボタン
      />
    );
  }

  return <div>エラーが発生しました。</div>;
}

export default App;