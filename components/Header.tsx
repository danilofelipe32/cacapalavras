import React from 'react';
import type { Difficulty } from '../types';

interface HeaderProps {
    onNewGame: () => void;
    currentDifficulty: Difficulty;
    onDifficultyChange: (difficulty: Difficulty) => void;
    timeElapsed: number;
}

const difficulties: Difficulty[] = ['Fácil', 'Médio', 'Difícil'];

const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};


const Header: React.FC<HeaderProps> = ({ onNewGame, currentDifficulty, onDifficultyChange, timeElapsed }) => {
    return (
        <header className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 max-w-7xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 text-center sm:text-left">
                Caça Palavras Moderno
            </h1>
            <div className="flex items-center gap-2 sm:gap-4">
                 <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-lg border border-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg font-mono text-slate-300" aria-label="Tempo decorrido">
                        {formatTime(timeElapsed)}
                    </span>
                </div>
                <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
                    {difficulties.map(level => (
                        <button
                            key={level}
                            onClick={() => onDifficultyChange(level)}
                            className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors duration-300 ${
                                currentDifficulty === level
                                    ? 'bg-sky-500 text-white'
                                    : 'text-slate-400 hover:bg-slate-700'
                            }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
                <button 
                    onClick={onNewGame}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 shadow-lg">
                    Novo Jogo
                </button>
            </div>
        </header>
    );
};

export default Header;
