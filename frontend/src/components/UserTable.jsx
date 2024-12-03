

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input, Button, Select, Row, Col, Typography, Checkbox, Table } from 'antd';
import Sidebar from './Sidebar';
import RoleSelectionTabs from './RoleSelectiontabs';  // Import the new RoleSelectionTabs component

const { Title } = Typography;
const { Option } = Select;

const Role = () => {
  const [userData, setUserData] = useState({
    employee_id: '',
    name: '',
    gender: '',
    dob: '',
    phone_number: '',
    emergency_contact_number: '',
    address: '',
    email: '',
    department_id: '',
    password: '',
    role: [], // Roles assigned to the user
  });

  const [roles, setRoles] = useState([]); // Available roles
  const [showRoleTabs, setShowRoleTabs] = useState(true); // Show/Hide the tabs view for roles
  const [selectedRoles, setSelectedRoles] = useState([]); // Roles selected by the user
  const [roleTableData, setRoleTableData] = useState([]); // Data to display in the table
  const navigate = useNavigate();
  const location = useLocation();

  const userId = new URLSearchParams(location.search).get('userId');

  useEffect(() => {
    // Fetch roles from the backend
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/roles');
        // console.log('Fetched roles:', response.data);
        if (response.status === 200) {
          setRoles(response.data); // Store available roles in state
          setRoleTableData(response.data); // Set initial data for table
        } else {
          toast.error('Failed to fetch roles');
        }
      } catch (error) {
        toast.error('Error fetching roles');
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();

    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/employees/${userId}`);
          if (response.status === 200) {
            const user = response.data;
            setUserData({
              employee_id: user.employee_id,
              name: user.name,
              email: user.email,
              gender: user.gender,
              dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
              phone_number: user.phone_number,
              emergency_contact_number: user.emergency_contact_number,
              address: user.address,
              department_id: user.department_id,
              password: user.password,
              // role: user.role, // Store selected roles here
              ...user,
              role: user.role || [],

            });
            setSelectedRoles(user.role || []); // Pre-select roles for the user
          } else {
            toast.error('Failed to fetch user data');
          }
        } catch (error) {
          toast.error('Error fetching user data');
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // const handleRoleChange = (selectedRoles) => {
  //   setSelectedRoles(selectedRoles); // Update the selected roles in state
  //   setUserData({ ...userData, role: selectedRoles });
  // };// changes
  // const handleRoleChange = (selectedRoles) => {
  //   setSelectedRoles(selectedRoles); // Update selected roles
  //   setUserData((prevState) => ({
  //     ...prevState,
  //     role: selectedRoles, // Sync with the main user data
  //   }));
  // };
  const handleRoleChange = (selectedRoles) => {
    if (!selectedRoles) {
      selectedRoles = []; // Fallback in case selectedRoles is undefined
    }
    setSelectedRoles(selectedRoles); // Update selected roles directly
    setUserData((prevState) => ({
      ...prevState,
      role: selectedRoles, // Sync with the main user data
    }));
  };

  const handleSubmit = async () => {
    try {
      if (userId) {
        // If userId exists, update the existing user
        console.log(userData);

        const response = await axios.put(`http://localhost:5000/employees/${userId}`, { ...userData });
        toast.success('Employee updated successfully!');
        setTimeout(() => navigate('/role'), 2000);
      } else {
        console.log(userData);
        // If no userId, create a new user
        const response = await axios.post('http://localhost:5000/register', { ...userData });
        toast.success('Employee registered successfully!');
        setTimeout(() => navigate('/role'), 2000);
      }
    } catch (error) {
      toast.error('Operation failed. Please try again.');
      console.error('Error during operation:', error);
    }
  };

  return (
    <div className="main">
      <div className="add-user-page">
        <Sidebar />
        <Row justify="center" gutter={[24, 24]} className="role-container">
          <Col xs={24} sm={8} md={8} lg={6} className="left-side">
            {/* You can customize the sidebar here or leave it empty */}
          </Col>

          <Col xs={24} sm={16} md={16} lg={18} className="right-side">
            <div className="Role-form-container">
              <Title level={2}>{userId ? 'Edit Employee' : 'Create New Employee'}</Title>
              <Form layout="vertical" onFinish={handleSubmit}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                      <Input placeholder="Enter name" value={userData.name} onChange={handleChange} name="name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
                      <Input placeholder="Enter email" value={userData.email} onChange={handleChange} name="email" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                      <Input.Password placeholder="Enter password" value={userData.password} onChange={handleChange} name="password" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select a gender!' }]}>
                      <Select value={userData.gender} onChange={(value) => setUserData({ ...userData, gender: value })} name="gender">
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: 'Please input your date of birth!' }]}>
                      <Input type="date" value={userData.dob} onChange={handleChange} name="dob" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Phone Number" name="phone_number" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                      <Input placeholder="Enter phone number" value={userData.phone_number} onChange={handleChange} name="phone_number" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Emergency Contact Number" name="emergency_contact_number" rules={[{ required: true, message: 'Please input your emergency contact number!' }]}>
                      <Input placeholder="Enter emergency contact number" value={userData.emergency_contact_number} onChange={handleChange} name="emergency_contact_number" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your address!' }]}>
                      <Input placeholder="Enter address" value={userData.address} onChange={handleChange} name="address" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    {userId ? 'Update Employee' : 'Create Employee'}
                  </Button>
                </Form.Item>
{/* 
                <Form.Item label="Role" name="role">
                  <Button type="link" onClick={() => setShowRoleTabs(!showRoleTabs)}>
                    Select Roles
                  </Button>
                </Form.Item> */}

                {showRoleTabs && (
                  <RoleSelectionTabs
                    roles={roles || []}
                    selectedRole={selectedRoles || []}
                    onRoleChange={handleRoleChange}
                    userData={userData}
                    setUserData={setUserData}
                  />
                )}

                <div className="back-button-container">
                  <Button type="default" onClick={() => navigate('/role')}>Back</Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Role;
//   return (
//     <div className="main">
//       <div className="add-user-page">
//         <Sidebar />
//         <Row justify="center" gutter={24} className="role-container">
//           <Col xs={24} sm={12} md={12} className="right-side">
//             <div className="Role-form-container">
//               <Title level={2}>{userId ? 'Edit Employee' : 'Create New Employee'}</Title>
//               <Form layout="vertical" onFinish={handleSubmit}>
//                 <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
//                   <Input placeholder="Enter name" value={userData.name} onChange={handleChange} name="name" />
//                 </Form.Item>
//                 <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
//                   <Input placeholder="Enter email" value={userData.email} onChange={handleChange} name="email" />
//                 </Form.Item>
//                 <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
//                   <Input.Password placeholder="Enter password" value={userData.password} onChange={handleChange} name="password" />
//                 </Form.Item>
//                 <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select a gender!' }]}>
//                   <Select value={userData.gender} onChange={(value) => setUserData({ ...userData, gender: value })} name="gender">
//                     <Option value="Male">Male</Option>
//                     <Option value="Female">Female</Option>
//                     <Option value="Other">Other</Option>
//                   </Select>
//                 </Form.Item>
//                 <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: 'Please input your date of birth!' }]}>
//                   <Input type="date" value={userData.dob} onChange={handleChange} name="dob" />
//                 </Form.Item>
//                 <Form.Item label="Phone Number" name="phone_number" rules={[{ required: true, message: 'Please input your phone number!' }]}>
//                   <Input placeholder="Enter phone number" value={userData.phone_number} onChange={handleChange} name="phone_number" />
//                 </Form.Item>
//                 <Form.Item label="Emergency Contact Number" name="emergency_contact_number" rules={[{ required: true, message: 'Please input your emergency contact number!' }]}>
//                   <Input placeholder="Enter emergency contact number" value={userData.emergency_contact_number} onChange={handleChange} name="emergency_contact_number" />
//                 </Form.Item>
//                 <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your address!' }]}>
//                   <Input placeholder="Enter address" value={userData.address} onChange={handleChange} name="address" />
//                 </Form.Item>

//                 <Form.Item>
//                   <Button type="primary" htmlType="submit" block>
//                     {userId ? 'Update Employee' : 'Create Employee'}
//                   </Button>
                 
//                 </Form.Item>

//                 <Form.Item label="Role" name="role">
//                   {/* <Button type="link" onClick={() => setShowRoleTabs(!showRoleTabs)}>
//                         Select Roles
//                       </Button> */}

//                 </Form.Item>

//                 {showRoleTabs && (
//                   <RoleSelectionTabs
//                     roles={roles || []}
//                     selectedRole={selectedRoles || []}
//                     onRoleChange={handleRoleChange}
//                   userData={userData}
//                   setUserData={setUserData}
//                   />
//                 )}


//                 <div className="back-button-container">
//                   <Button type="default" onClick={() => navigate('/role')}>Back</Button>
//                 </div>
//               </Form>


//             </div>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default Role;

