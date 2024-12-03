
    import React, { useState } from 'react';
    import { Tabs, Table, Checkbox, Button, Popconfirm, message } from 'antd';
    
    const { TabPane } = Tabs;
    
    const RoleSelectionTabs = ({ userData, setUserData }) => {
      // State to track selected roles
      const [selectedRoles, setSelectedRoles] = useState([]);
      const [activeTab, setActiveTab] = useState('roles');
    
      // Hardcoded data for roles with descriptions
      const roles = [
        { id: 1, role_name: 'Employee', description: 'Standard employee with limited access.' },
        { id: 2, role_name: 'HR', description: 'Human Resources with full access to employee data.' },
        { id: 3, role_name: 'TeamLeader', description: 'Leader of a team with management access.' },
        { id: 4, role_name: 'Admin', description: 'Administrator with all permissions.' },
      ];
    
      // Columns for the roles table
      const roleColumns = [
        {
          title: 'Select',
          key: 'select',
          render: (_, record) => (
            <Checkbox
              checked={selectedRoles.includes(record.role_name)}
              onChange={(e) => handleCheckboxChange(record.role_name, e.target.checked)}
            />
          ),
        },
        {
          title: 'Role Name',
          dataIndex: 'role_name',
          key: 'role_name',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        // {
        //   title: 'Actions',
        //   key: 'actions',
        //   render: (_, record) => (
        //     <div>
        //       <Button type="link" onClick={() => handleEdit(record)}>
        //         Edit
        //       </Button>
        //       <Popconfirm
        //         title="Are you sure to delete this role?"
        //         onConfirm={() => handleDelete(record)}
        //         okText="Yes"
        //         cancelText="No"
        //       >
        //         <Button type="link" danger>
        //           Delete
        //         </Button>
        //       </Popconfirm>
        //     </div>
        //   ),
        // },
      ];
    
      // Function to handle checkbox selection for roles
      const handleCheckboxChange = (roleName, checked) => {
        if (checked) {
          // Update selected roles in the state and userData
          setSelectedRoles([...selectedRoles, roleName]);
    
          // Add the role to userData if it's not already there
          setUserData((prevState) => ({
            ...prevState,
            role: [...prevState.role, roleName],
          }));
        } else {
          // Remove the role from selected roles in the state and userData
          setSelectedRoles(selectedRoles.filter((role) => role !== roleName));
    
          setUserData((prevState) => ({
            ...prevState,
            role: prevState.role.filter((role) => role !== roleName),
          }));
        }
      };
 
      
    
      // Handle Edit action
      const handleEdit = (record) => {
        message.info(`Editing role: ${record.role_name}`);
        // Implement edit functionality here
      };

    
      // Handle Delete action
      const handleDelete = (record) => {
        message.info(`Deleted role: ${record.role_name}`);
        // Implement delete functionality here
      };
    
      // Function to handle tab changes
      const handleTabChange = (key) => {
        setActiveTab(key);
      };
    
      // Handle submit of selected roles
      const handleSubmit = () => {
        
    
        message.success('Roles submitted successfully to the user table.');
        console.log(userData, selectedRoles);
    
        // Reset the selected roles after submission
        setSelectedRoles([]);
      };
    
      return (
        <Tabs defaultActiveKey="roles" onChange={handleTabChange} activeKey={activeTab}>
          {/* Roles Tab */}
          <TabPane tab="Roles" key="roles">
            <Table
              columns={roleColumns}
              dataSource={roles}
              rowKey="id" // Unique key for each role
              pagination={false}
              size="small"
            />
            {/* <Button
              type="primary"
              onClick={handleSubmit}
              style={{ marginTop: 16 }}
              disabled={selectedRoles.length === 0} // Disable if no roles are selected
            >
              Submit Roles
            </Button> */}
          </TabPane>
    
          {/* Other Tabs (Assets, Managers, etc.) */}
          <TabPane tab="Assets" key="assets">
            <p>Asset management content will go here.</p>
          </TabPane>
    
          <TabPane tab="Managers" key="managers">
            <p>Manager management content will go here.</p>
          </TabPane>
    
          {/* Display selected roles in the second tab */}
          {/* {selectedRoles.length > 0 && (
            <TabPane tab="Selected Roles" key="selectedRoles">
              <Table
                columns={roleColumns}
                dataSource={roles.filter((role) => selectedRoles.includes(role.role_name))}
                rowKey="id"
                pagination={false}
                size="small"    
              />
            </TabPane>
          )} */}
        </Tabs>
      );
    };
    
    export default RoleSelectionTabs;
    
    
    