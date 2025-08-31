export interface Word {
  text: string;
  found: boolean;
}

export interface Coordinate {
  row: number;
  col: number;
}

export type Difficulty = 'Fácil' | 'Médio' | 'Difícil';

export interface GameData {
  grid: string[][];
  words: Word[];
}
