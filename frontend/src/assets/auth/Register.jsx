import React, { useState } from 'react';
import { Card, Form, Input, Button, message, Typography, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const { login } = useAuth(); // Assumes AuthContext has login method
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (values) => {
    if (values.password !== values.passwordConfirmation) {
      return setError("Passwords do not match");
    }

    try {
      setError(null);
      setLoading(true);

      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        const data = await res.json(); // Parse the JSON response only after confirming success
        message.success(data.message || 'Registration successful');
        login(data.token, data.user); // Assuming data.user and data.token exist
      } else {
        const data = await res.json(); // Parse JSON for error handling as well
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="form-container">
      <Typography.Title level={3} className="title">
        Create an Account
      </Typography.Title>
      <Typography.Text type="secondary" className="slogan">
        welcome to our DotConnect!
      </Typography.Text>
      
      <Form layout="vertical" onFinish={handleRegister}>
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your full name' }]}
        >
          <Input size="large" placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'The input is not valid Email!' }
          ]}
        >
          <Input size="large" placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password size="large" placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="passwordConfirmation"
          rules={[{ required: true, message: 'Please confirm your password' }]}
        >
          <Input.Password size="large" placeholder="Re-enter your password" />
        </Form.Item>

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: '16px' }}
          />
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="btn"
          >
            Create Account
          </Button>
        </Form.Item>

        <Form.Item>
          <Link to="/login">
            <Button type="link" size="large" className="btn">
              Sign In
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Register;
