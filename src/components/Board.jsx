import React from 'react';
import Column from './Column';

const Board = ({ columns, setColumns }) => {
    return (
        <div className="board">
            {columns.map(column => (
                <Column key={column.id} column={column} setColumns={setColumns} columns={columns} />
            ))}
        </div>
    );
};

export default Board;
