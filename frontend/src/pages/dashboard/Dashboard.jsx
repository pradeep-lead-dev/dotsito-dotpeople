import React, { useEffect, useState } from 'react';
import { Divider, Button, message } from 'antd';
import { CheckCircleOutlined, LogoutOutlined } from '@ant-design/icons'; // Import icons from Ant Design
import { useNavigate } from 'react-router-dom'; // For navigation
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles
import moment from 'moment'; // Import moment for time formatting
import Sidebar from '../../components/Sidebar';
import './Dashboard.css'; // Custom CSS for styling

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({ checkIn: '', checkOut: '' }); // Initialize form state
  const navigate = useNavigate(); // Hook for navigation

  const autoFillTime = (type) => {
    const currentTime = moment().format('hh:mm A');
    setForm((prev) => ({ ...prev, [type]: currentTime }));
    message.success(`${type} time recorded at ${currentTime}`);
  };

  useEffect(() => {
    const dotconnectoken = localStorage.getItem('dotconnectoken');

    if (dotconnectoken) {
      // Parse the user data and set the state
      const parsedUser = JSON.parse(dotconnectoken);
      setUser(parsedUser);
      console.log('User data:', parsedUser); // Check if employee_id is available
    } else {
      // If no user is found, show a toast message and navigate to login
      toast.error('Please log in to continue');
      // navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="main-dashboard">
      <ToastContainer />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <h1 className="header-title">
            {user.role === 'admin' ? 'Home' : user.role === 'core_user' ? 'Core User Dashboard' : 'User Dashboard'}
          </h1>
          <Divider />

          <div className="user-info">
            <p><strong>Email:</strong> {user.email || 'Not Available'}</p>
            <p><strong>Username:</strong> {user.name || 'Not Available'}</p>
            <p><strong>Role:</strong> {user.role || 'Not Available'}</p>
            <p><strong>Employee Id:</strong> {user.employee_id || 'Not Available'}</p> {/* Employee ID Display */}
          </div>

          <Divider />

          {/* Display Check-In/Check-Out times */}
          <div className="time-info">
            <p><strong>Check-In Time:</strong> {form.checkIn || 'Not Checked In'}</p>
            <p><strong>Check-Out Time:</strong> {form.checkOut || 'Not Checked Out'}</p>
          </div>

          {/* Check-In/Check-Out Buttons with Icons and Styling */}
          <div className="action-buttons">
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => autoFillTime('checkIn')}
              style={{ marginRight: '10px', backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
            >
              Check-In
            </Button>
            <Button
              type="default"
              icon={<LogoutOutlined />}
              onClick={() => autoFillTime('checkOut')}
              style={{ backgroundColor: '#FF5722', borderColor: '#FF5722', color: '#fff' }}
            >
              Check-Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



