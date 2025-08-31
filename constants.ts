import type { Word, GameData, Difficulty } from './types';

// --- EASY ---
const EASY_GRID: string[][] = [
    ['S', 'B', 'L', 'Q', 'W', 'E', 'R', 'L', 'T', 'Y'],
    ['O', 'O', 'U', 'I', 'O', 'P', 'A', 'U', 'S', 'D'],
    ['L', 'L', 'A', 'J', 'H', 'G', 'S', 'A', 'F', 'Z'],
    ['X', 'A', 'C', 'A', 'S', 'A', 'A', 'M', 'K', 'L'],
    ['G', 'A', 'T', 'O', 'P', 'Q', 'W', 'E', 'R', 'T'],
    ['Y', 'U', 'I', 'O', 'Ã', 'P', 'A', 'S', 'D', 'F'],
    ['G', 'H', 'J', 'K', 'O', 'L', 'C', 'Z', 'X', 'C'],
    ['V', 'B', 'N', 'M', 'R', 'E', 'I', 'Q', 'W', 'E'],
    ['R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D'],
    ['F', 'G', 'C', 'Ã', 'O', 'J', 'K', 'L', 'Z', 'X']
];

const EASY_WORDS: Word[] = [
    { text: "SOL", found: false },
    { text: "BOLA", found: false },
    { text: "LUA", found: false },
    { text: "CASA", found: false },
    { text: "GATO", found: false },
    { text: "PÃO", found: false },
    { text: "REI", found: false },
    { text: "CÃO", found: false },
];


// --- MEDIUM ---
const MEDIUM_GRID: string[][] = [
    ['G', 'K', 'W', 'F', 'E', 'R', 'R', 'A', 'M', 'E', 'N', 'T', 'A', 'S', 'U', 'E', 'D', 'Y', 'R'],
    ['É', 'A', 'Z', 'U', 'L', 'O', 'L', 'H', 'O', 'C', 'Z', 'B', 'I', 'D', 'O', 'E', 'Z', 'D', 'E'],
    ['O', 'Q', 'N', 'O', 'T', 'A', 'Z', 'E', 'S', 'D', 'Z', 'U', 'N', 'O', 'E', 'Z', 'N', 'E', 'C'],
    ['U', 'U', 'O', 'C', 'E', 'C', 'O', 'S', 'O', 'D', 'L', 'M', 'F', 'A', 'D', 'B', 'O', 'C', 'O'],
    ['I', 'L', 'F', 'A', 'I', 'R', 'R', 'A', 'N', 'A', 'K', 'F', 'O', 'W', 'V', 'R', 'Ñ', 'O', 'N'],
    ['H', 'F', 'P', 'A', 'D', 'I', 'G', 'G', 'Z', 'J', 'J', 'D', 'R', 'R', 'A', 'C', 'A', 'M', 'H'],
    ['M', 'A', 'O', 'Ñ', 'E', 'A', 'A', 'R', 'X', 'H', 'G', 'V', 'M', 'Y', 'S', 'O', 'E', 'P', 'E'],
    ['K', 'A', 'V', 'Q', 'A', 'T', 'N', 'A', 'C', 'Q', 'N', 'Q', 'A', 'E', 'A', 'N', 'C', 'O', 'C'],
    ['A', 'E', 'U', 'Ç', 'C', 'I', 'I', 'S', 'A', 'P', 'T', 'K', 'Ç', 'F', 'R', 'F', 'A', 'S', 'E'],
    ['X', 'O', 'T', 'U', 'A', 'V', 'Z', 'C', 'E', 'L', 'W', 'R', 'O', 'N', 'V', 'I', 'S', 'I', 'R'],
    ['X', 'A', 'J', 'S', 'B', 'I', 'A', 'U', 'Y', 'G', 'G', 'O', 'E', 'O', 'L', 'A', 'A', 'C', 'P'],
    ['E', 'U', 'Ñ', 'R', 'I', 'D', 'C', 'I', 'Ç', 'S', 'U', 'O', 'S', 'X', 'A', 'V', 'E', 'A', 'A'],
    ['S', 'E', 'Q', 'H', 'D', 'A', 'A', 'U', 'P', 'E', 'R', 'R', 'A', 'L', 'E', 'S', 'O', 'D', 'O'],
    ['F', 'Ñ', 'J', 'X', 'E', 'D', 'O', 'T', 'D', 'N', 'N', 'D', 'A', 'I', 'O', 'L', 'U', 'N', 'R'],
    ['N', 'A', 'A', 'Ç', 'D', 'E', 'J', 'O', 'N', 'H', 'N', 'A', 'B', 'N', 'T', 'H', 'S', 'X', 'O'],
    ['G', 'U', 'O', 'V', 'O', 'F', 'A', 'I', 'A', 'A', 'S', 'R', 'M', 'G', 'Ç', 'M', 'X', 'F', 'E'],
    ['U', 'Ç', 'O', 'K', 'S', 'W', 'A', 'V', 'O', 'S', 'U', 'Ñ', 'O', 'O', 'K', 'A', 'O', 'O', 'S'],
    ['K', 'M', 'F', 'N', 'O', 'U', 'S', 'Q', 'F', 'O', 'U', 'A', 'B', 'E', 'C', 'E', 'K', 'U', 'D'],
    ['G', 'A', 'B', 'S', 'T', 'R', 'A', 'Ç', 'Ã', 'O', 'A', 'N', 'M', 'W', 'E', 'Ñ', 'V', 'Y', 'U']
];

const MEDIUM_WORDS: Word[] = [
    { text: "FERRAMENTAS", found: false }, { text: "OLHOS", found: false }, { text: "PERRALES", found: false },
    { text: "ABSTRAÇÃO", found: false }, { text: "CAMINHÃO", found: false }, { text: "CABIDE", found: false },
    { text: "COCO", found: false }, { text: "SOL", found: false }, { text: "CASA", found: false },
    { text: "LUAR", found: false }, { text: "MÃO", found: false }, { text: "JOVEM", found: false },
    { text: "AZUL", found: false }, { text: "DADO", found: false }, { text: "BEIJO", found: false },
    { text: "SUSTO", found: false }
];

// --- HARD ---
const HARD_GRID: string[][] = [
    ['C','O','N','S','T','I','T','U','I','Ç','Ã','O','A','B','C','D','E','F','G','H','I','J'],
    ['X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S'],
    ['I','N','D','E','P','E','N','D','Ê','N','C','I','A','Q','W','E','R','T','Y','U','I','O'],
    ['A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M','L','K','J','H','G','F'],
    ['U','N','I','V','E','R','S','I','D','A','D','E','B','I','B','L','I','O','T','E','C','A'],
    ['O','P','I','U','Y','T','R','E','W','Q','A','S','D','F','G','H','J','K','L','Z','X','C'],
    ['P','R','O','G','R','A','M','A','Ç','Ã','O','Z','X','C','V','B','N','M','Q','W','E','R'],
    ['T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Ç','P','O','I','U','Y','T'],
    ['M','A','T','E','M','Á','T','I','C','A','W','Q','A','Z','S','X','E','D','C','R','F','V'],
    ['T','G','B','Y','H','N','U','J','M','I','K','O','L','P','Ç','A','S','D','F','G','H','J'],
    ['F','I','L','O','S','O','F','I','A','S','D','F','G','H','J','K','L','Ç','Q','W','E','R'],
    ['T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'],
    ['A','S','T','R','O','N','O','M','I','A','W','E','R','T','Y','U','I','O','P','A','S','D'],
    ['F','G','H','J','K','L','Ç','Q','A','Z','X','S','W','E','D','C','V','F','R','B','G','T'],
    ['G','E','O','G','R','A','F','I','A','N','H','Y','J','U','K','I','L','O','Ç','P','M','N'],
    ['B','V','C','X','Z','L','K','J','H','G','F','D','S','A','P','O','I','U','Y','T','R','E'],
    ['B','I','O','L','O','G','I','A','W','Q','A','Z','S','X','E','D','C','R','F','V','T','G'],
    ['B','Y','H','N','U','J','M','I','K','O','L','P','Ç','A','S','D','F','G','H','J','K','L'],
    ['Z','X','C','V','B','N','M','Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G'],
    ['H','J','K','L','Ç','P','O','I','U','Y','T','R','E','W','Q','A','Z','S','X','E','D','C'],
    ['R','F','V','T','G','B','Y','H','N','U','J','M','I','K','O','L','P','Ç','A','S','D','F'],
    ['G','H','J','K','L','Z','X','C','V','B','N','M','Q','W','E','R','T','Y','U','I','O','P']
];

const HARD_WORDS: Word[] = [
    { text: "CONSTITUIÇÃO", found: false }, { text: "INDEPENDÊNCIA", found: false },
    { text: "UNIVERSIDADE", found: false }, { text: "BIBLIOTECA", found: false },
    { text: "PROGRAMAÇÃO", found: false }, { text: "MATEMÁTICA", found: false },
    { text: "FILOSOFIA", found: false }, { text: "ASTRONOMIA", found: false },
    { text: "GEOGRAFIA", found: false }, { text: "BIOLOGIA", found: false },
];

export const GAME_DATA: Record<Difficulty, GameData> = {
    'Fácil': {
        grid: EASY_GRID,
        words: EASY_WORDS
    },
    'Médio': {
        grid: MEDIUM_GRID,
        words: MEDIUM_WORDS
    },
    'Difícil': {
        grid: HARD_GRID,
        words: HARD_WORDS
    }
};

export const HIGHLIGHT_COLORS = [
    'bg-sky-500/60',
    'bg-emerald-500/60',
    'bg-rose-500/60',
    'bg-amber-500/60',
    'bg-violet-500/60',
    'bg-teal-500/60',
    'bg-pink-500/60',
    'bg-indigo-500/60',
];