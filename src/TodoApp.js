// Importing React and the useState Hook from the React library
// useState helps the app remember information (like the list of tasks)
import React, { useState } from 'react';

// Importing the CSS file that gives style and color to the To-Do App
import './TodoApp.css';

// Creating the main To-Do App component
const TodoApp = () => {

  // State 1: Keeps track of all tasks in a list (starts empty)
  const [tasks, setTasks] = useState([]);
  
  // State 2: Keeps track of what the user types in the input box
  const [inputValue, setInputValue] = useState('');
  
  // State 3: Keeps track of which filter is selected: "all", "active", or "completed"
  const [filter, setFilter] = useState('all');

  // Function to add a new task to the list
  const addTask = () => {
    // Only add a task if the input box isn’t empty
    if (inputValue.trim() !== '') {
      // Create a new task object
      const newTask = {
        id: Date.now(), // Unique ID based on the current time
        text: inputValue.trim(), // The task text
        completed: false, // By default, the task is not completed
        createdAt: new Date().toLocaleString() // Record when the task was added
      };
      
      // Add the new task to the list (while keeping old ones)
      setTasks([...tasks, newTask]);
      
      // Clear the input box after adding the task
      setInputValue('');
    }
  };

  // Function to add a task when the Enter key is pressed
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Function to mark a task as done or undone
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed } // Flip the "completed" status
          : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    // Keep all tasks except the one we want to delete
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Function to clear (remove) all completed tasks
  const clearCompletedTasks = () => {
    // Keep only tasks that are not completed
    setTasks(tasks.filter(task => !task.completed));
  };

  // Create a new list of tasks depending on the selected filter
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed; // Show only active tasks
      case 'completed':
        return task.completed; // Show only completed tasks
      default:
        return true; // Show all tasks
    }
  });

  // Calculate task statistics
  const totalTasks = tasks.length; // Total number of tasks
  const completedTasks = tasks.filter(task => task.completed).length; // How many are done
  const activeTasks = totalTasks - completedTasks; // How many are still active

  // Everything below this point describes what will appear on the screen
  return (
    <div className="todo-app">
      {/* App Header */}
      <header className="todo-header">
        <h1>Simple To-Do List</h1>
        <p>Manage your daily tasks efficiently</p>
      </header>

      {/* Section for adding a new task */}
      <div className="add-task-section">
        <div className="input-group">
          {/* Input box for typing a new task */}
          <input
            type="text"
            value={inputValue} // Shows what’s typed
            onChange={(e) => setInputValue(e.target.value)} // Update inputValue when typing
            onKeyPress={handleKeyPress} // Add task when Enter is pressed
            placeholder="What needs to be done?"
            className="task-input"
          />
          {/* Button to add the new task */}
          <button onClick={addTask} className="add-btn">
            Add Task
          </button>
        </div>
      </div>

      {/* Task Statistics Section */}
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

      {/* Filter Buttons (All, Active, Completed) */}
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

      {/* Tasks List Section */}
      <div className="tasks-list">
        {/* If there are no tasks (or none match the filter), show a friendly message */}
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <p>
              {tasks.length === 0 
                ? "No tasks yet. Add a task to get started!" 
                : "No tasks match the current filter."}
            </p>
          </div>
        ) : (
          // Otherwise, show each task
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              <div className="task-content">
                {/* Checkbox to mark the task as completed or not */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="task-checkbox"
                />
                {/* Show the task text and the date it was created */}
                <span className="task-text">{task.text}</span>
                <small className="task-date">{task.createdAt}</small>
              </div>
              {/* Button to delete this task */}
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

      {/* Button to clear all completed tasks (only shows if there are any) */}
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

// Exporting this component so it can be used in other parts of the app
export default TodoApp;
