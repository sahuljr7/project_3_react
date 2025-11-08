import React, { useState } from 'react';
import './TodoApp.css';

const TodoApp = () => {
  // State for managing the list of tasks
  const [tasks, setTasks] = useState([]);
  
  // State for managing the input field value
  const [inputValue, setInputValue] = useState('');
  
  // State for managing filter (all, active, completed)
  const [filter, setFilter] = useState('all');

  // Add a new task
  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(), // Simple unique ID
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date().toLocaleString()
      };
      
      setTasks([...tasks, newTask]);
      setInputValue(''); // Clear input after adding
    }
  };

  // Handle Enter key press in input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Clear all completed tasks
  const clearCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true; // 'all' - show all tasks
    }
  });

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <div className="todo-app">
      <header className="todo-header">
        <h1>Simple To-Do List</h1>
        <p>Manage your daily tasks efficiently</p>
      </header>

      {/* Add Task Section */}
      <div className="add-task-section">
        <div className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
            className="task-input"
          />
          <button onClick={addTask} className="add-btn">
            Add Task
          </button>
        </div>
      </div>

      {/* Task Statistics */}
      <div className="task-stats">
        <div className="stat-item">
          <span className="stat-number">{totalTasks}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{activeTasks}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completedTasks}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="filter-controls">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {/* Tasks List */}
      <div className="tasks-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <p>
              {tasks.length === 0 
                ? "No tasks yet. Add a task to get started!" 
                : "No tasks match the current filter."}
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="task-checkbox"
                />
                <span className="task-text">{task.text}</span>
                <small className="task-date">{task.createdAt}</small>
              </div>
              <button 
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
                title="Delete task"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {/* Clear Completed Button */}
      {completedTasks > 0 && (
        <div className="clear-section">
          <button onClick={clearCompletedTasks} className="clear-btn">
            Clear Completed ({completedTasks})
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoApp;