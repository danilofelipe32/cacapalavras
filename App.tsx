import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import WordList from './components/WordList';
import { GAME_DATA, HIGHLIGHT_COLORS } from './constants';
import type { Word, Coordinate, Difficulty } from './types';

const directions = [
    { dr: -1, dc: 0 }, { dr: -1, dc: 1 }, { dr: 0, dc: 1 }, { dr: 1, dc: 1 },
    { dr: 1, dc: 0 }, { dr: 1, dc: -1 }, { dr: 0, dc: -1 }, { dr: -1, dc: -1 }
];

const findWordCoordinates = (grid: string[][], words: Word[]): Map<string, Coordinate[]> => {
    const locations = new Map<string, Coordinate[]>();
    if (!grid || grid.length === 0) return locations;

    const numRows = grid.length;
    const numCols = grid[0].length;

    for (const word of words) {
        const wordText = word.text;
        let found = false;

        for (let r = 0; r < numRows; r++) {
            for (let c = 0; c < numCols; c++) {
                for (const dir of directions) {
                    const coords: Coordinate[] = [];
                    let match = true;
                    for (let i = 0; i < wordText.length; i++) {
                        const newRow = r + i * dir.dr;
                        const newCol = c + i * dir.dc;

                        if (
                            newRow < 0 || newRow >= numRows ||
                            newCol < 0 || newCol >= numCols ||
                            grid[newRow][newCol] !== wordText[i]
                        ) {
                            match = false;
                            break;
                        }
                        coords.push({ row: newRow, col: newCol });
                    }

                    if (match) {
                        locations.set(wordText, coords);
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
            if (found) break;
        }
    }
    return locations;
};


const App: React.FC = () => {
    const [difficulty, setDifficulty] = useState<Difficulty>('Médio');
    const [words, setWords] = useState<Word[]>([]);
    const [grid, setGrid] = useState<string[][]>([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selection, setSelection] = useState<Coordinate[]>([]);
    const [foundCells, setFoundCells] = useState<Map<string, string>>(new Map());
    const [gameWon, setGameWon] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [wordLocations, setWordLocations] = useState<Map<string, Coordinate[]>>(new Map());
    const [passwordInput, setPasswordInput] = useState('');
    const [triggerReveal, setTriggerReveal] = useState(false);

    const initializeGame = useCallback((level: Difficulty) => {
        const gameData = GAME_DATA[level];
        const wordsWithState = JSON.parse(JSON.stringify(gameData.words));
        setWords(wordsWithState);
        setGrid(gameData.grid);
        setWordLocations(findWordCoordinates(gameData.grid, wordsWithState));
        setFoundCells(new Map());
        setSelection([]);
        setIsSelecting(false);
        setGameWon(false);
        setTimeElapsed(0);
        setIsTimerActive(true);
        setPasswordInput('');
        setTriggerReveal(false);
    }, []);

    useEffect(() => {
        initializeGame(difficulty);
    }, [difficulty, initializeGame]);
    
    const REVEAL_PASSWORD = '12345678';
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (gameWon) return;

            const newPasswordInput = passwordInput + event.key;

            if (REVEAL_PASSWORD.startsWith(newPasswordInput)) {
                setPasswordInput(newPasswordInput);
                if (newPasswordInput === REVEAL_PASSWORD) {
                    setTriggerReveal(true);
                    setPasswordInput(''); 
                }
            } else {
                setPasswordInput(event.key === '1' ? '1' : '');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [passwordInput, gameWon]);
    
    useEffect(() => {
        if (triggerReveal) {
            const newFoundCells = new Map(foundCells);
            const revealColor = 'bg-yellow-500/50';

            words.forEach(word => {
                if (!word.found) {
                    const locations = wordLocations.get(word.text);
                    if (locations) {
                        locations.forEach(coord => {
                            if (!newFoundCells.has(`${coord.row}-${coord.col}`)) {
                                newFoundCells.set(`${coord.row}-${coord.col}`, revealColor);
                            }
                        });
                    }
                }
            });
            setFoundCells(newFoundCells);
            setTriggerReveal(false);
        }
    }, [triggerReveal, words, wordLocations, foundCells]);


    const checkWinCondition = useCallback(() => {
        if (words.length > 0 && words.every(word => word.found)) {
            setGameWon(true);
            setIsTimerActive(false);
        }
    }, [words]);

    useEffect(() => {
        let interval: number | undefined;
        if (isTimerActive) {
            interval = window.setInterval(() => {
                setTimeElapsed(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isTimerActive]);

    useEffect(() => {
        checkWinCondition();
    }, [words, checkWinCondition]);

    useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (isSelecting) {
                setIsSelecting(false);
                
                if (selection.length > 1) {
                    const selectedString = selection.map(coord => grid[coord.row][coord.col]).join('');
                    const reversedSelectedString = selectedString.split('').reverse().join('');

                    const wordToFind = words.find(w => !w.found && (w.text === selectedString || w.text === reversedSelectedString));

                    if (wordToFind) {
                        setWords(prevWords => prevWords.map(w => w.text === wordToFind.text ? { ...w, found: true } : w));
                        
                        const newFoundCells = new Map(foundCells);
                        const color = HIGHLIGHT_COLORS[words.filter(w => w.found).length % HIGHLIGHT_COLORS.length];
                        selection.forEach(coord => {
                            newFoundCells.set(`${coord.row}-${coord.col}`, color);
                        });
                        setFoundCells(newFoundCells);
                    }
                }
                setSelection([]);
            }
        };

        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isSelecting, selection, words, foundCells, grid]);

    const handleMouseDown = (row: number, col: number) => {
        setIsSelecting(true);
        setSelection([{ row, col }]);
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (isSelecting) {
            setSelection(prevSelection => {
                const newSelection = [...prevSelection];
                const last = newSelection[newSelection.length - 1];
                if (!last) return [{row, col}];

                const rowDiff = row - last.row;
                const colDiff = col - last.col;

                if(newSelection.length === 1 && (Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1)) {
                    if (!newSelection.some(c => c.row === row && c.col === col)) {
                         newSelection.push({ row, col });
                    }
                    return newSelection;
                }
                
                if (newSelection.length > 1) {
                    const secondLast = newSelection[newSelection.length - 2];
                    const dirRow = last.row - secondLast.row;
                    const dirCol = last.col - secondLast.col;

                    if (row === last.row + dirRow && col === last.col + dirCol) {
                        if (!newSelection.some(c => c.row === row && c.col === col)) {
                            newSelection.push({ row, col });
                        }
                    }
                }
                return newSelection;
            });
        }
    };
    
    const handleResetGame = () => {
        initializeGame(difficulty);
    };

    const handleDifficultyChange = (level: Difficulty) => {
        setDifficulty(level);
    };
    
    if (grid.length === 0) {
        return <div className="bg-slate-900 min-h-screen flex items-center justify-center text-white">Carregando...</div>;
    }

    return (
        <div className="min-h-screen text-white flex flex-col items-center p-4 sm:p-6 md:p-8">
            <Header 
                onNewGame={handleResetGame} 
                currentDifficulty={difficulty}
                onDifficultyChange={handleDifficultyChange}
                timeElapsed={timeElapsed}
            />
            <main className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mt-6">
                <Grid 
                    grid={grid} 
                    selection={selection}
                    foundCells={foundCells}
                    onMouseDown={handleMouseDown}
                    onMouseEnter={handleMouseEnter}
                />
                <WordList words={words} />
            </main>

            {gameWon && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-slate-800 p-8 rounded-xl shadow-2xl text-center border border-slate-600">
                        <h2 className="text-4xl font-bold text-emerald-400 mb-4">Parabéns!</h2>
                        <p className="text-slate-300 text-lg mb-2">Você encontrou todas as palavras.</p>
                        <p className="text-slate-400 text-base mb-6">Seu tempo foi: <span className="font-bold text-white">{Math.floor(timeElapsed / 60).toString().padStart(2, '0')}:{(timeElapsed % 60).toString().padStart(2, '0')}</span></p>
                        <button 
                            onClick={handleResetGame}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                            Jogar Novamente
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;