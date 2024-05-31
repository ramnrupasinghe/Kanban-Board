import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css';

const App = () => {
    const [tasks, setTasks] = useState({
        todo: [],
        inProgress: [],
        done: []
    });
    const [taskInput, setTaskInput] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        const now = new Date();
        Object.keys(tasks).forEach(column => {
            tasks[column].forEach(task => {
                if (new Date(task.dueDate) <= now) {
                    alert(`Task "${task.text}" is due!`);
                }
            });
        });
    }, [tasks]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;

        const sourceColumn = tasks[source.droppableId];
        const destColumn = tasks[destination.droppableId];

        const [movedTask] = sourceColumn.splice(source.index, 1);
        destColumn.splice(destination.index, 0, movedTask);

        setTasks({
            ...tasks,
            [source.droppableId]: sourceColumn,
            [destination.droppableId]: destColumn
        });
    };

    const addTask = () => {
        if (taskInput.trim() && dueDate) {
            const newTask = { text: taskInput, dueDate };
            setTasks({
                ...tasks,
                todo: [...tasks.todo, newTask]
            });
            setTaskInput('');
            setDueDate('');
        }
    };

    return (
        <div className="app">
            <h1>Task Manager</h1>
            <input
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Enter a task"
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="board">
                    {Object.keys(tasks).map((columnId) => (
                        <Droppable key={columnId} droppableId={columnId}>
                            {(provided) => (
                                <div
                                    className="column"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h2>{columnId}</h2>
                                    <div className="tasks">
                                        {tasks[columnId].map((task, index) => (
                                            <Draggable key={task.text} draggableId={task.text} index={index}>
                                                {(provided) => (
                                                    <div
                                                        className="task"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        {task.text} (Due: {task.dueDate})
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default App;
