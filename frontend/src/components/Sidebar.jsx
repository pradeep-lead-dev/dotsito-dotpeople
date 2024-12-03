import React, { useEffect } from 'react';
import { Layout, Menu, Tooltip } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import {
    HomeOutlined,
    UserAddOutlined,
    FieldTimeOutlined,
    FormOutlined,
    DollarOutlined,
    TeamOutlined,
    SettingOutlined,
    IdcardOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
import logo from '../assets/images/logo.png';
 
const { Sider } = Layout;
 
const menuItems = [
    { key: '/dashboard', label: 'Dashboard', icon: <HomeOutlined /> },
    { key: '/role', label: 'Employees', icon: <IdcardOutlined/> },
    {key:'/role-Management',label:'RoleManagement', icon: <UserAddOutlined /> },
    { key: '/timesheet', label: 'Timesheet', icon: <FieldTimeOutlined /> },
    { key: '/leave', label: 'Leave Application', icon: <FormOutlined /> },
    { key: '/salary', label: 'Salary Management', icon: <DollarOutlined /> },
    { key: '/paysliptable', label: 'PaySlip', icon: <DollarOutlined /> },
    { key: '/team', label: 'Team Management', icon: <TeamOutlined /> },
    { key: '/settings', label: 'Settings', icon: <SettingOutlined /> },
];
 
const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuthenticated } = useAuth();
 
   
    const selectedKey = location.pathname;
 
    const handleLogout = () => {
        localStorage.removeItem('dotconnectoken');
        sessionStorage.clear();
        setAuthenticated(false);
        navigate('/');
    };
 
    return (
        <Sider className="sidebar" theme="light" width={200}>
            <LogoSection />
            <MenuSection items={menuItems} selectedKey={selectedKey} onSelect={(key) => navigate(key)} />
            <LogoutSection onLogout={handleLogout} />
        </Sider>
    );
};
 
const LogoSection = () => (
    <div className="logo-section">
        <img src={logo} alt="Logo" className="logo" />
    </div>
);
 
const MenuSection = ({ items, selectedKey, onSelect }) => (
    <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        className="menu-section"
        theme="light"
        items={items.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: (
                <Tooltip title={item.label} placement="right">
                    {item.label}
                </Tooltip>
            ),
            onClick: () => onSelect(item.key),
        }))}
    />
);
 
const LogoutSection = ({ onLogout }) => (
    <div className="logout-section" onClick={onLogout}>
        <Tooltip title="Logout" placement="right">
            <LogoutOutlined className="logout-icon" />
        </Tooltip>
    </div>
);
 
export default Sidebar;