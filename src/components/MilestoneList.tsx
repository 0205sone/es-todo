// src/components/MilestoneList.tsx
import React from 'react';
import { SongMilestone } from '../types';

interface Props {
  milestones: SongMilestone[];
  currentPoints: number;
  onMilestoneClick: (points: number) => void;
}

export function MilestoneList({ milestones, currentPoints, onMilestoneClick }: Props) {
  if (milestones.length === 0) {
    return <p style={{textAlign:'center', color:'#667788'}}>目標を設定すると、ここにタスクが表示されます。</p>;
  }

  return (
    <ul className="milestone-list">
      {milestones.map((milestone) => {
        const isCompleted = currentPoints >= milestone.points;

        return (
          <li 
            key={milestone.id} 
            className={isCompleted ? 'completed' : ''}
            onClick={() => onMilestoneClick(milestone.points)}
          >
            {/* チェックボックス */}
            <div style={{
              width: '20px', height: '20px', 
              borderRadius: '50%', 
              border: isCompleted ? '2px solid #38b6ff' : '2px solid #ccc',
              backgroundColor: isCompleted ? '#38b6ff' : 'white',
              marginRight: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 'bold', fontSize: '14px'
            }}>
              {isCompleted && '✓'}
            </div>
            
            {/* テキスト */}
            <div style={{ flex: 1 }}>
              {milestone.name}
            </div>

            {/* ポイント数（バッジ風） */}
            <div style={{ 
              backgroundColor: isCompleted ? '#bfe6ff' : '#ff69b4', 
              color: isCompleted ? '#0077aa' : 'white',
              padding: '4px 8px', 
              borderRadius: '12px', 
              fontSize: '0.8em', 
              fontWeight: 'bold' 
            }}>
              {milestone.points.toLocaleString()} pt
            </div>
          </li>
        );
      })}
    </ul>
  );
}