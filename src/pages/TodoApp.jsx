import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./TodoApp.css";

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
        priority,
        dueDate,
      },
    ]);
    setTask("");
    setPriority("Medium");
    setDueDate("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const updateTask = (id, text) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  const markAllComplete = () => {
    setTasks(tasks.map((t) => ({ ...t, completed: true })));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newTasks = Array.from(tasks);
    const [moved] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, moved);
    setTasks(newTasks);
  };

  return (
    <div className="app-wrapper">
      <div className="todo-card">
        <h1 className="todo-title">To-Do List</h1>

        {/* Input group */}
        <div className="todo-input-group">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            className="todo-input"
            placeholder="Enter a task"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="todo-priority"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="todo-date"
          />
          <button onClick={addTask} className="todo-add-btn">
            Add
          </button>
        </div>

        {/* Batch actions */}
        <div className="batch-actions">
          <button onClick={clearCompleted}>Clear Completed</button>
          <button onClick={markAllComplete}>Mark All Complete</button>
        </div>

        {/* Task list with drag-and-drop */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul
                className="todo-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((t, i) => (
                  <Draggable key={t.id} draggableId={t.id.toString()} index={i}>
                    {(provided, snapshot) => (
                      <li
                        className={`todo-item ${
                          snapshot.isDragging ? "dragging" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <span
                          className={`todo-text ${
                            t.completed ? "completed" : ""
                          }`}
                          contentEditable
                          suppressContentEditableWarning={true}
                          onBlur={(e) => updateTask(t.id, e.target.textContent)}
                          onClick={() => toggleComplete(t.id)}
                        >
                          {t.text}
                        </span>
                        <span className={`priority ${t.priority.toLowerCase()}`}>
                          {t.priority}
                        </span>
                        {t.dueDate && <span className="due-date">{t.dueDate}</span>}
                        <button
                          onClick={() => deleteTask(t.id)}
                          className="todo-delete-btn"
                        >
                          ✖
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
