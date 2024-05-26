import React from 'react';

const Task = ({ task }) => {
    return (
        <div className="task">
            {task.text}
        </div>
    );
};

export default Task;
