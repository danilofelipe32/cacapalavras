
import React from 'react';
import type { Coordinate } from '../types';

interface GridProps {
    grid: string[][];
    selection: Coordinate[];
    foundCells: Map<string, string>;
    onMouseDown: (row: number, col: number) => void;
    onMouseEnter: (row: number, col: number) => void;
}

// Cell component defined outside Grid to prevent re-creation on every render
interface CellProps {
    char: string;
    row: number;
    col: number;
    isSelected: boolean;
    foundColor: string | undefined;
    onMouseDown: (row: number, col: number) => void;
    onMouseEnter: (row: number, col: number) => void;
}

const Cell: React.FC<CellProps> = React.memo(({ char, row, col, isSelected, foundColor, onMouseDown, onMouseEnter }) => {
    const foundClass = foundColor ? `${foundColor} text-slate-100 font-bold` : '';
    const selectedClass = isSelected ? 'bg-blue-500/70' : '';
    const baseClass = 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-slate-300 font-medium select-none cursor-pointer rounded-md transition-colors duration-150';

    return (
        <div
            className={`${baseClass} ${foundClass} ${selectedClass}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            data-row={row}
            data-col={col}
        >
            {char}
        </div>
    );
});
Cell.displayName = 'Cell';

const Grid: React.FC<GridProps> = ({ grid, selection, foundCells, onMouseDown, onMouseEnter }) => {
    const isCellSelected = (row: number, col: number) => {
        return selection.some(coord => coord.row === row && coord.col === col);
    };

    return (
        <div className="bg-slate-800 p-4 rounded-xl shadow-2xl border border-slate-700 flex-shrink-0">
            <div 
                className="grid gap-1"
                style={{ gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))` }}
                onMouseLeave={() => { /* This can help cancel selection if mouse leaves grid */ }}
            >
                {grid.map((row, rowIndex) =>
                    row.map((char, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            char={char}
                            row={rowIndex}
                            col={colIndex}
                            isSelected={isCellSelected(rowIndex, colIndex)}
                            foundColor={foundCells.get(`${rowIndex}-${colIndex}`)}
                            onMouseDown={onMouseDown}
                            onMouseEnter={onMouseEnter}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Grid;
