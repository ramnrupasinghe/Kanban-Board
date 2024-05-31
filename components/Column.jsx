import React, { useState } from 'react';
import Task from './Task';

const Column = ({ column, setColumns, columns }) => {
    const [taskText, setTaskText] = useState('');

    const addTask = () => {
        const newTask = { id: Date.now(), text: taskText };
        const newColumns = columns.map(col => {
            if (col.id === column.id) {
                return { ...col, tasks: [...col.tasks, newTask] };
            }
            return col;
        });
        setColumns(newColumns);
        setTaskText('');
    };

    return (
        <div className="column">
            <h2>{column.title}</h2>
            <div className="tasks">
                {column.tasks.map(task => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
            <input
                type="text"
                value={taskText}
                onChange={e => setTaskText(e.target.value)}
                placeholder="Add a task"
            />
            <button onClick={addTask}>Add Task</button>
        </div>
    );
};

export default Column;
