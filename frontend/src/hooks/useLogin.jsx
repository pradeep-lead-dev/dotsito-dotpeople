import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const LoginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        // Successful login
        message.success(data.message || 'Login successful');
        login(data.token, data.user);
        navigate('/dashboard'); // Redirect to dashboard after login
      } else {
        // Failed login
        setError(data.message || 'Invalid credentials. Please try again.');
        message.error(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setError(error.message || 'An unexpected error occurred');
      message.error(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, LoginUser };
};

export default useLogin;
