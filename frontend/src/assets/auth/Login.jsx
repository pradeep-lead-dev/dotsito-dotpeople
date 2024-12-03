import React, { useState } from 'react';
import { Card, Form, Input, Button, message, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (values) => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // If login is successful
        message.success(data.message || 'Login successful');
        login(data.token, data.user); // Assuming `data.token` and `data.user` exist
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        // If login fails
        setError(data.message || 'Login failed. Please check your email and password.');
        message.error(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setError(error.message || 'An unexpected error occurred');
      message.error(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="form-container">
      <Typography.Title level={3} strong className="title">Sign In</Typography.Title>
      <Typography.Text type="secondary" strong className="slogan">Unlock the world!</Typography.Text>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your Email' },
            { type: 'email', message: 'The input is not a valid Email!' },
          ]}
        >
          <Input size="large" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your Password' }]}
        >
          <Input.Password size="large" placeholder="Enter your Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" className="btn" loading={loading}>
            Sign In
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/register">
            <Button size="large" className="btn">Create an Account</Button>
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
