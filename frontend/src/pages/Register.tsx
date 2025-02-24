import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Username and Password are required');
      return;
    }

    try {
      await apiClient.post('/auth/register', { username, password });
      setShowSuccess(true);
      setUsername('');
      setPassword('');
    } catch (err) {
      setError('Registration failed - username may be taken');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f0f2f5',
      position: 'relative'
    }}>
      {/* Success Toast */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '16px',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 1000,
          animation: 'slideIn 0.5s ease-out'
        }}>
          Registration successful! Please login.
        </div>
      )}

      {/* Registration Form */}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        margin: '0 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{ 
          textAlign: 'center',
          color: '#1a73e8',
          marginBottom: '2rem',
          fontSize: '1.5rem',
          width: '100%'
        }}>
          Register
        </h2>

        {error && (
          <div style={{
            color: '#dc3545',
            backgroundColor: '#f8d7da',
            padding: '0.8rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            textAlign: 'center',
            width: '100%'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '100%',
          maxWidth: '300px'
        }}>
          {/* Username Input */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem',
            width: '100%'
          }}>
            <label style={{ 
              fontWeight: 500, 
              color: '#4a5568',
              textAlign: 'left'
            }}>
              Username <span style={{ color: 'red' }}>*</span>
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
              placeholder="Choose a username"
              required
            />
          </div>

          {/* Password Input */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem',
            width: '100%'
          }}>
            <label style={{ 
              fontWeight: 500, 
              color: '#4a5568',
              textAlign: 'left'
            }}>
              Password <span style={{ color: 'red' }}>*</span>
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
              placeholder="Create a password"
              required
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
            Create Account
          </button>
        </form>

        <div style={{ 
          textAlign: 'center',
          marginTop: '1.5rem',
          color: '#718096',
          width: '100%'
        }}>
          Already have an account?{' '}
          <Link 
            to="/login" 
            style={{ 
              color: '#1a73e8',
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            Login here
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translate(-50%, 100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
