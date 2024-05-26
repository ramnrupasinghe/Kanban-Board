import React, { useState } from 'react';
import Board from './components/Board';

const App = () => {
    const [columns, setColumns] = useState([
        { id: 1, title: 'To Do', tasks: [] },
        { id: 2, title: 'In Progress', tasks: [] },
        { id: 3, title: 'Done', tasks: [] }
    ]);

    return (
        <div className="app">
            <h1>Kanban Board</h1>
            <Board columns={columns} setColumns={setColumns} />
        </div>
    );
};

export default App;
