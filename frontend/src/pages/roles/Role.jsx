
  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { Table, Spin, message, Button, Layout, Modal, Form, Input, Select } from 'antd';
  import { useNavigate } from 'react-router-dom';
  import { UserOutlined, FileTextOutlined } from '@ant-design/icons';
  import './Role.css';
  import Sidebar from '../../components/Sidebar'; // Correct Sidebar import

  const { Header, Content } = Layout;

  const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [form] = Form.useForm(); // Used for editing in modal
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true); // Start loading animation
        try {
          // Make a GET request to your backend to fetch all employees
          const response = await axios.get('http://localhost:5000/employees');
          if (response.status === 200) {
            setUsers(response.data);
          } else {
            message.error('Failed to fetch users');
          }
        } catch (error) {
          message.error('Error fetching users');
          console.error('Error fetching users:', error);
        } finally {
          setLoading(false); // Stop loading animation
        }
      };

      // Call fetchUsers function to load the data
      fetchUsers();
    }, []);

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/employees/${id}`);
        message.success('User deleted successfully');
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        message.error('Error deleting user');
      }
    };
    // const showEditModal = (user) => {
    //   setEditingUser(user);
    //   setIsModalVisible(true);
    //   form.setFieldsValue({
    //     ...user,
    //     dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
    //     role: user.role || 'employee',
    //   });
    //   navigate('/users', { state: { user } }); // Navigate and pass user data via state
    // };
    // empty page 

    const showEditModal = (user) => {
      console.log('Selected User:', user);
      setEditingUser(user);
      setIsModalVisible(true);
      // setUserData(user);
      form.setFieldsValue({
        ...user,
        dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
        role: user.role || 'employee',
      });
      
      navigate('/users',{state:{userData}});
    };
    

    const handleEditSubmit = async (values) => {
      try {
        
        const response = await axios.put(`http://localhost:5000/employees/${editingUser._id}`, values);

        if (response.status === 200) {
          message.success('User updated successfully');

          setUsers(users.map((user) =>
            user._id === editingUser._id ? { ...response.data.employee } : user
          ));

          // Close modal and reset editing user
          setIsModalVisible(false);
          setEditingUser(null);
        } else {
          message.error('Failed to update user');
        }
      } catch (error) {
        message.error('Error updating user');
      }
    };
    
    


    const columns = [
      { title: 'Employee ID', dataIndex: 'employee_id', key: 'employee_id' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Gender', dataIndex: 'gender', key: 'gender' },
      {
        title: 'DOB',
        dataIndex: 'dob',
        key: 'dob',
        render: (dob) => (dob ? new Date(dob).toLocaleDateString() : 'N/A'),
      },
      { title: 'Phone Number', dataIndex: 'phone_number', key: 'phone_number' },
      { title: 'Address', dataIndex: 'address', key: 'address' },
      { title: 'Department ID', dataIndex: 'department_id', key: 'department_id' },
      { title: 'emergency_contact_number', dataIndex: 'emergency_contact_number', key: 'emergency_contact_number' },
      { title: 'Role', dataIndex: 'role', key: 'role' },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, user) => (
          <>
            <Button onClick={() => showEditModal(user)}>Edit</Button>


            <Button onClick={() => handleDelete(user._id)} style={{ marginLeft: 10 }} danger>
              Delete
            </Button>
          </>
        ),
      },
    ];

    if (loading) {
      return <Spin size="large" />;
    }


    return (
      <Layout className="layout-container">
        <Sidebar />  {/* Render the custom Sidebar component here */}
        <Layout className="sidebar-layout">
          {/* <Header className="header-layout" /> */}
          <div className="table-container">
            <Content className="content-layout">
              <div className='header-title'>

                <Button
                  type="primary"
                  onClick={() => navigate('/users')} // Navigate to "Create User" page
                  className="button-add-user"
                >
                  Add User
                </Button>

                <h2 className="table-title">User Data</h2></div>
              <Table columns={columns} dataSource={users} rowKey="_id" pagination={{ pageSize: 5 }} />
            </Content>
          </div>

        </Layout>

        {/* Modal for Editing User */}
        <Modal
          title="Edit User"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          className="modal-width"
        >

          <Form form={form} onFinish={handleEditSubmit}>
            <Form.Item name="name" label="Name" className="form-item" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="email" label="Email" className="form-item" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="role" label="Role" className="form-item" rules={[{ required: true }]}>
              <Select value={users.role}  mode="multiple" className="select-role">
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="employee">Employee</Select.Option>
                <Select.Option value="HR">HR</Select.Option>
                <Select.Option value="TeamLeader">Team Leader</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="phone_number" label="Phone Number" className="form-item">
              <Input />
            </Form.Item>
            <Form.Item name="emergency_contact_number" label="Emergency Contact" className="form-item" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

            <Form.Item name="address" label="Address" className="form-item">
              <Input />
            </Form.Item>

            <Form.Item name="dob" label="Date of Birth" className="form-item">
              <Input type="date" />
            </Form.Item>

            <Form.Item name="gender" label="Gender" className="form-item">
              <Select className="select-gender">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </Form.Item>
          

            <Button type="primary" htmlType="submit" className="form-button">
              Update User
            </Button>
          </Form>
        </Modal>
      </Layout>
    );
  };

  export default UserTable;



