import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Layout, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const AddRole = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Send the new role to your backend API to store it in the database
      const response = await axios.post('http://localhost:5000/roles', values);
      if (response.status === 200) {
        message.success('Role added successfully');
        navigate('/role-management'); // Redirect to Role Management Page after success
      } else {
        message.error('Failed to add role');
      }
    } catch (error) {
      message.error('Error adding role');
      console.error('Error adding role:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '20px' }}>
        <h2>Add New Role</h2>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Role Name"
            rules={[{ required: true, message: 'Please enter the role name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '100%' }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <div className="back-button-container">
                <Button type="default" onClick={() => navigate('/role-management')}>Back</Button>
            </div>
    </Layout>
  );
};

export default AddRole;
