import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Layout, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const RoleManagement = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch roles data from the backend
        const fetchRoles = async () => {
            setLoading(true);
            try {
                // Replace with your API endpoint
                const response = await axios.get('http://localhost:5000/roles');
                if (response.status === 200) {
                    setRoles(response.data);
                } else {
                    message.error('Failed to fetch roles');
                }
            } catch (error) {
                message.error('Error fetching roles');
                console.error('Error fetching roles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    // Columns for Role Table
    const columns = [
        { title: 'Role ID', dataIndex: '_id', key: '_id' },
        { title: 'Role Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, role) => (
                <>
                    {/* Add other actions if necessary */}
                </>
            ),
        },
    ];

    return (
        <Layout>
            <Content style={{ padding: '20px' }}>
                <Button
                    type="primary"
                    onClick={() => navigate('/add-role')} // Navigate to the Role Form page
                    style={{ marginBottom: 20 }}
                >
                    Add Role
                </Button>

                <Table
                    columns={columns}
                    dataSource={roles}
                    rowKey="_id"
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                />
            </Content>
            <div className="back-button-container">
                <Button type="default" onClick={() => navigate(-1)}>Back</Button>
            </div>
        </Layout>
    );
};

export default RoleManagement;
