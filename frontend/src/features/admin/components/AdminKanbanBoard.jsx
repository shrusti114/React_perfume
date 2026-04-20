import React, { useState } from 'react';
import { Plus, GripVertical, Trash2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

const initialColumns = ['Todo', 'In Progress', 'Review', 'Done'];
const initialTasks = [
  { id: '1', title: 'Update homepage hero banner', status: 'Todo', priority: 'High' },
  { id: '2', title: 'Review new seller applications', status: 'In Progress', priority: 'Medium' },
  { id: '3', title: 'Fix cart synchronization bug', status: 'Review', priority: 'High' },
  { id: '4', title: 'Add kanban board feature', status: 'Done', priority: 'Low' },
];

export function AdminKanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingToCol, setIsAddingToCol] = useState(null);

  // HTML5 Drag parameters
  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
    // Firefox compatibility requires setting some data
    e.dataTransfer.setData('text/plain', taskId);
    
    // Add brief timeout for visual styling while dragging
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedTaskId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    setTasks((prev) => 
      prev.map((task) => 
        task.id === draggedTaskId ? { ...task, status: targetStatus } : task
      )
    );
  };

  const addTask = (status) => {
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      status,
      priority: 'Medium', // Generic default priority
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setIsAddingToCol(null);
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-500 border border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-600 border border-yellow-500/30';
      case 'Low': return 'bg-blue-500/20 text-blue-500 border border-blue-500/30';
      default: return 'bg-neutral-500/20 text-neutral-500';
    }
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 min-h-[60vh]">
      {initialColumns.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col);
        
        return (
          <div
            key={col}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col)}
            className="flex-none w-80 bg-white dark:bg-[#111] rounded-[2rem] border border-black/5 dark:border-white/5 p-6 flex flex-col shadow-sm"
          >
            <div className="flex items-center justify-between mb-6 px-1">
              <h3 className="font-serif text-xl tracking-tight dark:text-white flex items-center gap-2">
                {col}
                <span className="text-xs bg-[#f8c8dc]/20 text-[#f8c8dc] py-1 px-2.5 rounded-full font-bold ml-1 font-sans">
                  {colTasks.length}
                </span>
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              {colTasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onDragEnd={handleDragEnd}
                  className={cn(
                    "group relative bg-neutral-50 dark:bg-black p-5 rounded-2xl border border-black/5 dark:border-white/5 cursor-grab active:cursor-grabbing hover:border-[#f8c8dc]/50 transition-all",
                    draggedTaskId === task.id ? 'opacity-50 blur-[1px]' : ''
                  )}
                >
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <p className="text-sm dark:text-white font-medium break-words leading-tight">
                      {task.title}
                    </p>
                    <GripVertical size={16} className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className={cn("text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm", getPriorityColor(task.priority))}>
                      {task.priority}
                    </span>
                    
                    <button 
                      onClick={() => removeTask(task.id)}
                      className="text-neutral-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {isAddingToCol === col ? (
                <div className="bg-neutral-50 dark:bg-black p-4 rounded-2xl border border-[#f8c8dc]/30">
                  <textarea
                    autoFocus
                    placeholder="Enter task title..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        addTask(col);
                      } else if (e.key === 'Escape') {
                        setIsAddingToCol(null);
                      }
                    }}
                    className="w-full bg-transparent text-sm dark:text-white placeholder:text-neutral-500 focus:outline-none resize-none"
                    rows={2}
                  />
                  <div className="flex mt-3 gap-2">
                    <button
                      onClick={() => addTask(col)}
                      className="flex-1 bg-[#f8c8dc] text-black py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setIsAddingToCol(null)}
                      className="px-3 text-neutral-500 hover:text-neutral-700 dark:hover:text-white text-xs font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingToCol(col)}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-dashed border-black/10 dark:border-white/10 text-neutral-400 hover:text-black dark:hover:text-white hover:border-[#f8c8dc] hover:bg-[#f8c8dc]/5 transition-all text-xs font-bold uppercase tracking-widest"
                >
                  <Plus size={14} /> Add Task
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
