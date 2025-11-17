// src/components/EventSelection.tsx
import React, { useState, useEffect } from 'react';
import { EventType } from '../types';

interface Props {
  onStart: (type: EventType, start: string, end: string) => void;
}

export function EventSelection({ onStart }: Props) {
  const [type, setType] = useState<EventType>('song');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  // 初期値を設定 (今日の日付)
  useEffect(() => {
    const now = new Date();
    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = ('0' + (d.getMonth() + 1)).slice(-2);
      const day = ('0' + d.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    };
    const todayStr = formatDate(now);
    setStart(`${todayStr}T15:00`);
    setEnd(`${todayStr}T22:00`);
  }, []);

  const handleStart = () => {
    if (start && end) {
      onStart(type, start, end);
    } else {
      alert('開始日時と終了日時を選択してください');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      {/* タイトル */}
      <h3 style={{ fontSize: '1.5em', marginBottom: '30px' }}>
        あんスタ イベント進捗管理
      </h3>

      {/* 入力フォーム全体を白いカードで囲む */}
      <div className="white-card" style={{ padding: '40px 30px', textAlign: 'center' }}>
        
        {/* 1. イベント種類の選択 */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '15px', fontSize: '1.1em', color: '#0077aa' }}>
            イベントの種類を選んでください
          </label>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {/* 曲イベントボタン */}
            <label 
              style={{ 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                padding: '10px 20px', 
                border: type === 'song' ? '2px solid #38b6ff' : '2px solid #e0f0ff', 
                borderRadius: '30px', 
                background: type === 'song' ? '#e6f4ff' : 'white',
                fontWeight: 'bold',
                color: type === 'song' ? '#0077aa' : '#667788',
                transition: 'all 0.2s'
              }}
            >
              <input
                type="radio"
                name="eventType"
                checked={type === 'song'}
                onChange={() => setType('song')}
                style={{ marginRight: '8px', width: 'auto' }}
              /> 
              曲イベント
            </label>

            {/* ツアーイベントボタン */}
            <label 
              style={{ 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                padding: '10px 20px', 
                border: type === 'tour' ? '2px solid #38b6ff' : '2px solid #e0f0ff', 
                borderRadius: '30px', 
                background: type === 'tour' ? '#e6f4ff' : 'white',
                fontWeight: 'bold',
                color: type === 'tour' ? '#0077aa' : '#667788',
                transition: 'all 0.2s'
              }}
            >
              <input
                type="radio"
                name="eventType"
                checked={type === 'tour'}
                onChange={() => setType('tour')}
                style={{ marginRight: '8px', width: 'auto' }}
              /> 
              ツアーイベント
            </label>
          </div>
        </div>

        {/* 2. 開始日時 */}
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '8px', marginLeft: '5px' }}>開始日時</label>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            style={{ width: '100%', padding: '12px' }}
          />
        </div>

        {/* 3. 終了日時 */}
        <div style={{ marginBottom: '40px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '8px', marginLeft: '5px' }}>終了日時</label>
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            style={{ width: '100%', padding: '12px' }}
          />
        </div>

        {/* 開始ボタン */}
        <button 
          onClick={handleStart} 
          style={{ 
            width: '100%', 
            padding: '15px', 
            fontSize: '1.1em',
            boxShadow: '0 5px 15px rgba(56, 182, 255, 0.4)'
          }}
        >
          イベント進捗を記録する
        </button>

      </div>
    </div>
  );
}