import { useState, useEffect } from 'react';
import apiClient from '../api/client';
import { useAuth } from '../context/AuthContext';

interface Task {
  id: number;
  title: string;
  description?: string;
  is_complete: boolean;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState<Task | null>(null); // For editing a task
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { logout, token } = useAuth();

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiClient.get('/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        setError('Failed to fetch tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [token]);

  // Create task
  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      const response = await apiClient.post(
        '/tasks',
        {
          title: newTask.title,
          description: newTask.description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '' }); // Clear form
    } catch (error) {
      console.error('Failed to create task:', error);
      setError('Failed to create task. Please try again.');
    }
  };

  // Update task
  const updateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask?.title.trim()) return;

    try {
      const response = await apiClient.put(
        `/tasks/${editingTask.id}`,
        {
          title: editingTask.title,
          description: editingTask.description,
          is_complete: editingTask.is_complete,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(tasks.map((task) => (task.id === editingTask.id ? response.data : task)));
      setEditingTask(null); // Exit edit mode
    } catch (error) {
      console.error('Failed to update task:', error);
      setError('Failed to update task. Please try again.');
    }
  };

  // Delete task
  const deleteTask = async (taskId: number) => {
    try {
      await apiClient.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
      setError('Failed to delete task. Please try again.');
    }
  };

  // Toggle task completion status
    const toggleComplete = async (taskId: number) => {
        const task = tasks.find((task) => task.id === taskId);
        if (!task) return;
    
        try {
        const response = await apiClient.put(
            `/tasks/${taskId}`,
            {
            title: task.title,
            description: task.description,
            is_complete: !task.is_complete,
            },
            {
            headers: { Authorization: `Bearer ${token}` },
            }
        );
        setTasks(tasks.map((task) => (task.id === taskId ? response.data : task)));
        } catch (error) {
        console.error('Failed to update task:', error);
        setError('Failed to update task. Please try again.');
        }
    };
    
  
  
  // Enter edit mode
  const startEditing = (task: Task) => {
    setEditingTask(task);
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem',
        position: 'relative',
      }}
    >
      {/* Logout Button */}
      <button
        onClick={logout}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: '#dc3545',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>

      {/* Error Message */}
      {error && (
        <div
          style={{
            background: '#ffebee',
            color: '#c62828',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          {error}
        </div>
      )}

      {/* Create Task Form */}
      <form
        onSubmit={createTask}
        style={{
          marginBottom: '2rem',
          background: '#fff',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            required
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            style={{
              padding: '0.8rem',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
          />

          <textarea
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            style={{
              padding: '0.8rem',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '1rem',
              minHeight: '100px',
              resize: 'vertical',
            }}
          />

          <button
            type="submit"
            style={{
              background: '#1a73e8',
              color: 'white',
              padding: '0.8rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Create Task
          </button>
        </div>
      </form>

      {/* Tasks List */}
      {loading ? (
        <div style={{ textAlign: 'center', color: '#4a5568' }}>Loading tasks...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                opacity: task.is_complete ? 0.7 : 1, // Reduce opacity for completed tasks
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={task.is_complete}
                  onChange={() => toggleComplete(task.id)}
                  style={{
                    transform: 'scale(1.3)',
                    cursor: 'pointer',
                  }}
                />
             <h3
                style={{
                margin: 0,
                fontSize: '1.1rem',
                textDecoration: task.is_complete ? 'line-through' : 'none', 
                color: task.is_complete ? '#718096' : '#2d3748', 
                     }}
                >
                {task.title}
            </h3>
              </div>

                {task.description && (
                <p
                style={{
                color: '#718096',
                margin: '0.5rem 0 0 2rem',
                fontSize: '0.95rem',
                textDecoration: task.is_complete ? 'line-through' : 'none', 
            }}
                >
    {task.description}
  </p>     
          
              )}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  onClick={() => startEditing(task)}
                  style={{
                    background: '#ffc107',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    background: '#dc3545',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '8px',
              width: '400px',
            }}
          >
            <h2>Edit Task</h2>
            <form onSubmit={updateTask}>
              <input
                required
                type="text"
                placeholder="Task Title"
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                style={{
                  padding: '0.8rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  width: '100%',
                  marginBottom: '1rem',
                }}
              />
              <textarea
                placeholder="Task Description"
                value={editingTask.description}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                style={{
                  padding: '0.8rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  width: '100%',
                  minHeight: '100px',
                  resize: 'vertical',
                  marginBottom: '1rem',
                }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    background: '#1a73e8',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTask(null)}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}