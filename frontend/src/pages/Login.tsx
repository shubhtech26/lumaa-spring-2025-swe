// Login.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await apiClient.post('/auth/login', { username, password });
      login(response.data.token);
      navigate('/tasks');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f0f2f5',
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        margin: '0 1rem',
        display: 'flex',          // Added
        flexDirection: 'column',  // Added
        alignItems: 'center'      // Added
      }}>
        <h2 style={{ 
          textAlign: 'center',
          color: '#1a73e8',
          marginBottom: '2rem',
          fontSize: '1.5rem',
          width: '100%'          // Added
        }}>
          Login
        </h2>

        {error && (
          <div style={{
            color: '#dc3545',
            backgroundColor: '#f8d7da',
            padding: '0.8rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            textAlign: 'center',
            width: '100%'        // Added
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '100%',         // Added
          maxWidth: '300px'      // Added
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem',
            width: '100%'       // Added
          }}>
            <label style={{ 
              fontWeight: 500, 
              color: '#4a5568',
              textAlign: 'left'  // Explicit left alignment for labels
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                padding: '0.8rem',
                border: `1px solid ${error ? '#dc3545' : '#e2e8f0'}`,
                borderRadius: '4px',
                fontSize: '1rem',
                width: '100%'
              }}
              placeholder="Enter your username"
            />
          </div>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem',
            width: '100%'       // Added
          }}>
            <label style={{ 
              fontWeight: 500, 
              color: '#4a5568',
              textAlign: 'left'  // Explicit left alignment for labels
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '0.8rem',
                border: `1px solid ${error ? '#dc3545' : '#e2e8f0'}`,
                borderRadius: '4px',
                fontSize: '1rem',
                width: '100%'
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            style={{
              background: '#1a73e8',
              color: 'white',
              padding: '0.8rem',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Sign In
          </button>
        </form>

        <div style={{ 
          textAlign: 'center',
          marginTop: '1.5rem',
          color: '#718096',
          width: '100%'        // Added
        }}>
          Don't have an account?{' '}
          <Link 
            to="/register" 
            style={{ 
              color: '#1a73e8',
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}