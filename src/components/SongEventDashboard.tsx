// src/components/SongEventDashboard.tsx
import React, { useState, useEffect } from 'react';
import { SongGoal, SongMilestone } from '../types';
import { getMilestonesForGoal, getFinalTargetPoints } from '../data/eventData';
import { calculateTimeRemaining } from '../data/utils';
import { MilestoneList } from './MilestoneList';
import { SongGoalSelector } from './SongGoalSelector';

interface Props {
  endDate: string;
  onBack: () => void;
}

const BONUS_RATES = {
  star5: [0, 20, 50, 75, 100, 150],
  star4: [0, 5, 15, 25, 35, 50],
  star3: [0, 1, 2, 3, 4, 5],
};

interface ScoutResult {
  star5: number;
  star4: number;
  star3: number;
}

export function SongEventDashboard({ endDate, onBack }: Props) {
  // --- State ---
  const [goal, setGoal] = useState<SongGoal>({ star5: 0, star4: 0, star3_1: 0, star3_2: 0 });
  const [currentPoints, setCurrentPoints] = useState(0);
  const [milestones, setMilestones] = useState<SongMilestone[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(endDate));
  
  const [scout1, setScout1] = useState<ScoutResult>({ star5: 0, star4: 0, star3: 0 });
  const [scout2, setScout2] = useState<ScoutResult>({ star5: 0, star4: 0, star3: 0 });
  
  const [samplePlay, setSamplePlay] = useState({ bp: 3, points: 0 });
  const [useEventSong, setUseEventSong] = useState(true);
  const [eventSongPoints, setEventSongPoints] = useState(0);

  // --- Logic ---
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(endDate));
    }, 60000);
    return () => clearInterval(interval);
  }, [endDate]);

  useEffect(() => {
    const newMilestones = getMilestonesForGoal(goal);
    setMilestones(newMilestones);
  }, [goal]);

  const calculateBonus = (scout: ScoutResult) => {
    const b5 = BONUS_RATES.star5[Math.min(scout.star5, 5)] || 0;
    const b4 = BONUS_RATES.star4[Math.min(scout.star4, 5)] || 0;
    const b3 = BONUS_RATES.star3[Math.min(scout.star3, 5)] || 0; 
    return b5 + b4 + b3;
  };
  const totalBonusPercent = calculateBonus(scout1) + calculateBonus(scout2);

  const finalTargetPoints = getFinalTargetPoints(goal);
  const remainingPoints = Math.max(0, finalTargetPoints - currentPoints);

  const getDirectPoints = (bp: number) => {
    if (samplePlay.points > 0 && samplePlay.bp > 0) {
      return (samplePlay.points / samplePlay.bp) * bp;
    }
    const basePoints = bp === 10 ? 25000 : bp === 6 ? 15000 : bp === 3 ? 7500 : 2500 * bp;
    return basePoints * (1 + totalBonusPercent / 100);
  };

  const getEffectivePointsPerPlay = (bp: number) => {
    const directPoints = getDirectPoints(bp);
    if (!useEventSong || eventSongPoints <= 0) return directPoints;
    
    const passesEarned = bp * 10;
    const eventSongRatio = passesEarned / 1000;
    const futurePoints = eventSongPoints * eventSongRatio;
    
    return directPoints + futurePoints;
  };

  const calcPlays = (bp: number) => {
    const effectivePt = getEffectivePointsPerPlay(bp);
    if (effectivePt === 0) return 0;
    return Math.ceil(remainingPoints / effectivePt);
  };

  const playsBp3 = calcPlays(3);
  const playsBp6 = calcPlays(6);
  const playsBp10 = calcPlays(10);

  // 入力用コンポーネント
  const ScoutInput = ({ label, data, setData }: { label: string, data: ScoutResult, setData: (d: ScoutResult) => void }) => (
    <fieldset>
      <legend>{label}</legend>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <div style={{textAlign: 'center'}}>
          <span style={{fontSize:'0.8em', display:'block'}}>★5</span>
          <input type="number" min="0" max="5" value={data.star5} onChange={(e) => setData({...data, star5: Number(e.target.value)})} style={{width: '50px', padding: '5px'}} />
        </div>
        <div style={{textAlign: 'center'}}>
          <span style={{fontSize:'0.8em', display:'block'}}>★4</span>
          <input type="number" min="0" max="5" value={data.star4} onChange={(e) => setData({...data, star4: Number(e.target.value)})} style={{width: '50px', padding: '5px'}} />
        </div>
        <div style={{textAlign: 'center'}}>
          <span style={{fontSize:'0.8em', display:'block'}}>★3</span>
          <input type="number" min="0" max="5" value={data.star3} onChange={(e) => setData({...data, star3: Number(e.target.value)})} style={{width: '50px', padding: '5px'}} />
        </div>
      </div>
    </fieldset>
  );

  return (
    <div className="fade-in">
      {/* ヘッダーエリア */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', position: 'relative' }}>
        <button onClick={onBack} style={{ position: 'absolute', left: 0 }}>
           ◀ 戻る
        </button>
        <h3 style={{ width: '100%', margin: 0 }}>曲イベント進捗</h3>
      </div>
      
      {/* --- 上部のステータスカード (背景は白/薄い水色) --- */}
      <div className="status-card">
        <div style={{ fontSize: '1.5em', fontWeight: '800', marginBottom: '5px', color: '#0077aa' }}>
           {timeRemaining}
        </div>
        <div style={{ fontSize: '1.1em' }}>
           目標まであと <span className="highlight-num">{remainingPoints.toLocaleString()} pt</span>
        </div>
        <div style={{ fontSize: '0.9em', marginTop: '5px', color: '#667788' }}>
           (特効ボーナス合計: <span className="highlight-accent">+{totalBonusPercent}%</span>)
        </div>

        {/* ライブ回数目安エリア */}
        <div className="live-count-area">
          <p style={{ margin: '0 0 10px 0', fontSize: '0.9em', fontWeight: 'bold', color: '#334455' }}>
             ▼ ライブ回数の目安 {useEventSong && eventSongPoints > 0 && <span>(イベ曲込)</span>}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', color: '#334455' }}>
            <div><span style={{fontSize:'0.8em'}}>BP3</span><br/><strong style={{fontSize:'1.4em'}}>{playsBp3.toLocaleString()}</strong><span style={{fontSize:'0.8em'}}>回</span></div>
            <div style={{borderLeft:'1px solid #bfe6ff', height:'30px'}}></div>
            <div><span style={{fontSize:'0.8em'}}>BP6</span><br/><strong style={{fontSize:'1.4em'}}>{playsBp6.toLocaleString()}</strong><span style={{fontSize:'0.8em'}}>回</span></div>
            <div style={{borderLeft:'1px solid #bfe6ff', height:'30px'}}></div>
            <div><span style={{fontSize:'0.8em'}}>BP10</span><br/><strong style={{fontSize:'1.4em'}}>{playsBp10.toLocaleString()}</strong><span style={{fontSize:'0.8em'}}>回</span></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* --- 左側：入力（白いカード） --- */}
        <div className="white-card">
          {/* 1. 現在のポイント */}
          <div style={{ marginBottom: '20px' }}>
            <label>現在のポイント</label>
            <input
              type="number"
              value={currentPoints}
              onChange={(e) => setCurrentPoints(Number(e.target.value))}
              step="1000"
              style={{ fontSize: '1.2em' }}
            />
          </div>

          {/* 2. ライブ効率 */}
          <div style={{ marginBottom: '20px' }}>
             <label>① 通常ライブの実測値</label>
             <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
               <select 
                 value={samplePlay.bp} 
                 onChange={(e) => setSamplePlay({...samplePlay, bp: Number(e.target.value)})}
                 style={{ width: '80px' }}
               >
                 <option value={3}>BP 3</option>
                 <option value={6}>BP 6</option>
                 <option value={10}>BP 10</option>
               </select>
               <span>で</span>
               <input 
                 type="number" 
                 value={samplePlay.points}
                 onChange={(e) => setSamplePlay({...samplePlay, points: Number(e.target.value)})}
                 placeholder="獲得pt"
               />
               <span>pt</span>
             </div>

             {/* イベント楽曲 */}
             <div style={{ borderTop: '2px dashed #e0f0ff', paddingTop: '15px', marginTop: '15px' }}>
               <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                 <input 
                   type="checkbox" 
                   checked={useEventSong} 
                   onChange={(e) => setUseEventSong(e.target.checked)}
                   style={{ marginRight: '8px', width: 'auto' }}
                 />
                 ② イベ曲を含めて計算
               </label>
               
               {useEventSong && (
                 <div style={{ marginTop: '10px', paddingLeft: '25px' }}>
                   <input 
                     type="number" 
                     value={eventSongPoints}
                     onChange={(e) => setEventSongPoints(Number(e.target.value))}
                     placeholder="例: 35000"
                     style={{ width: '120px' }}
                   /> <span style={{fontSize:'0.9em', color:'#8899aa'}}>pt / パス1000枚</span>
                 </div>
               )}
             </div>
          </div>

          {/* 3. 特効設定 */}
          <div style={{ marginBottom: '20px' }}>
            <label>特効スカウト状況</label>
            <ScoutInput label="スカウト A" data={scout1} setData={setScout1} />
            <ScoutInput label="スカウト B" data={scout2} setData={setScout2} />
          </div>

          {/* 4. 目標設定 */}
          <div style={{ borderTop: '2px solid #f0f5fa', paddingTop: '15px' }}>
             <SongGoalSelector goal={goal} onGoalChange={setGoal} />
          </div>
        </div>

        {/* --- 右側：リスト（白いカード） --- */}
        <div className="white-card">
          <h4>報酬リスト</h4>
          <p style={{ fontSize: '0.8em', color: '#8899aa', marginBottom: '10px' }}>
            ※クリックで現在のptに反映されます
          </p>
          <div className="milestone-list">
            <MilestoneList 
              milestones={milestones} 
              currentPoints={currentPoints} 
              onMilestoneClick={(pt) => setCurrentPoints(pt)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}