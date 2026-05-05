export type CountdownTime = {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
};

export const EMPTY_COUNTDOWN_TIME: CountdownTime = {
  dias: 0,
  horas: 0,
  minutos: 0,
  segundos: 0,
};

export function getTimeLeft(targetDate: string, now = Date.now()): CountdownTime {
  const diff = new Date(targetDate).getTime() - now;

  if (diff <= 0) {
    return EMPTY_COUNTDOWN_TIME;
  }

  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}
