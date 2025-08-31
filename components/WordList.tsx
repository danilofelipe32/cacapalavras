import React from 'react';
import type { Word } from '../types';

interface WordListProps {
    words: Word[];
}

const WordList: React.FC<WordListProps> = ({ words }) => {
    return (
        <div className="bg-slate-800 p-6 rounded-xl shadow-2xl border border-slate-700 w-full lg:w-80 lg:flex-shrink-0 h-fit">
            <h2 className="text-2xl font-bold mb-4 text-slate-200 border-b-2 border-slate-600 pb-2">Palavras</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-x-4 gap-y-2">
                {words.map(word => (
                    <li 
                        key={word.text}
                        className={`
                            relative text-lg transition-colors duration-300
                            ${word.found ? 'text-slate-400' : 'text-slate-300'}
                        `}
                    >
                        {word.text}
                        <span
                            aria-hidden="true"
                            className={`
                                absolute top-1/2 left-0 h-[2px] w-full bg-emerald-400 origin-left
                                transition-transform duration-500 ease-in-out -translate-y-1/2
                                ${word.found ? 'scale-x-100' : 'scale-x-0'}
                            `}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WordList;
