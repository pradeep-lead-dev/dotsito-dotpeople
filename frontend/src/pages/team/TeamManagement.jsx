import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, List, Select, Divider, Typography, notification } from "antd";
import Sidebar from "../../components/Sidebar";
import "./TeamManagement.css";

const { Title } = Typography;

const initialEmployeeData = {
  allEmployees: [
    { id: 1, name: "John Doe", status: "Present", leaveDays: 5 },
    { id: 2, name: "Jane Smith", status: "Absent", leaveDays: 3 },
    { id: 3, name: "Alice Green", status: "Present", leaveDays: 2 },
    { id: 4, name: "Bob Brown", status: "Absent", leaveDays: 7 },
  ],
};

const LeaveManagement = () => {
  const [employees, setEmployees] = useState(initialEmployeeData.allEmployees);
  const [selectedView, setSelectedView] = useState("all");
  const navigate = useNavigate();

  const filterEmployees = () => {
    switch (selectedView) {
      case "present":
        return employees.filter((employee) => employee.status === "Present");
      case "absent":
        return employees.filter((employee) => employee.status === "Absent");
      case "leaveDetails":
        return employees.filter((employee) => employee.leaveDays > 0);
      default:
        return employees;
    }
  };

  const showNotification = (name, status) => {
    notification.info({
      message: `${name} Status`,
      description: `${name} is currently ${status}.`,
    });
  };

  return (
    <div className="main">
      <Sidebar />
      <div className="container">
        <Title className="header-title">HR Dashboard</Title>
        <Divider />

        <div className="flex-container">
          {/* Left Panel - View Selection */}
          <div className="left-panel">
            <Title level={4}>Filter By</Title>
            <Select
              defaultValue="all"
              onChange={(value) => setSelectedView(value)}
              style={{ marginBottom: "20px" }}
            >
              <Select.Option value="all">All Employees</Select.Option>
              <Select.Option value="present">Present Employees</Select.Option>
              <Select.Option value="absent">Absent Employees</Select.Option>
              <Select.Option value="leaveDetails">Employees with Leave Days</Select.Option>
            </Select>

            <Button type="primary" style={{ width: "100%" }} onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>

          {/* Right Panel - Display Employee List */}
          <div className="right-panel">
            <List
              header={<div>{selectedView === "leaveDetails" ? "Employees with Leave Days" : "Employee Status"}</div>}
              bordered
              dataSource={filterEmployees()}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      type="link"
                      onClick={() => showNotification(item.name, item.status)}
                    >
                      View Status
                    </Button>,
                  ]}
                >
                  <div>
                    <strong>{item.name}</strong> - {item.status} {selectedView === "leaveDetails" ? ` (Leave Days: ${item.leaveDays})` : ""}
                  </div>
                </List.Item>
              )}
            />

            <div className="additional-info">
              <h3>Additional Information</h3>
              <p>
                You can view details for each employee, including their leave days and attendance status.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
