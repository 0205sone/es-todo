// src/data/utils.ts

/**
 * イベント終了日時までの残り時間を計算する
 * @param endDateString 'YYYY-MM-DDTHH:MM' 形式の終了日時
 * @returns 'あと 〇 日 〇 時間' または 'イベント終了'
 */
export const calculateTimeRemaining = (endDateString: string): string => {
  if (!endDateString) return '終了日時未設定';

  const end = new Date(endDateString);
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();

  if (diffMs <= 0) return 'イベント終了';

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);

  return `あと ${days} 日 ${hours} 時間`;
};