// import React, { useState, useEffect } from "react";
// import {
//   Form,
//   Input,
//   Button,
//   notification,
//   Card,
//   Col,
//   Row,
//   Layout,
//   Typography,
//   Alert,
//   Table,
//   DatePicker,
//   Select,
//   Steps,
// } from "antd";
// import axios from "axios";
// import Sidebar from "../../components/Sidebar";
// import { useNavigate } from 'react-router-dom';
// import moment from "moment";
// import './LeaveApplication.css';

// const { TextArea } = Input;
// const { Header, Content } = Layout;
// const { Title } = Typography;
// const { Option } = Select;
// const { Step } = Steps;
// const { RangePicker } = DatePicker;

// const LeaveApplication = () => {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const [employeeInfo, setEmployeeInfo] = useState({ id: "", name: "", email: "" });
//   const [remainingLeaves, setRemainingLeaves] = useState(21);
//   const [totalDaysUsed, setTotalDaysUsed] = useState(0);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [leaveLimitReached, setLeaveLimitReached] = useState(false);
//   const [leaveHistory, setLeaveHistory] = useState([]);

//   useEffect(() => {
//     const fetchEmployeeInfo = async () => {
//       const employeeData = await getEmployeeInfo();
//       setEmployeeInfo(employeeData);
//       form.setFieldsValue({
//         employee_id: employeeData.id,
//         employeeName: employeeData.name,
//       });
//       await fetchLeaveSummary(employeeData.id);
//     };
//     fetchEmployeeInfo();
//   }, [form]);

//   const getEmployeeInfo = async () => {
//     return { id: "EMP12345678", name: "Dotsito EMP", email: "johndoe@example.com" };
//   };

//   const fetchLeaveSummary = async (employeeId) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/leave-summary/${employeeId}`);
//       const { remainingDays, totalDaysUsed, leaveHistory } = response.data;
//       setLeaveHistory(Array.isArray(leaveHistory) ? leaveHistory : []);
//       setTotalDaysUsed(totalDaysUsed);
//       setRemainingLeaves(remainingDays);
//       setLeaveLimitReached(remainingDays <= 0);
//     } catch (error) {
//       notification.error({
//         message: "Error",
//         description: "Failed to fetch leave history.",
//       });
//     }
//   };

//   const calculateLeaveDays = (startDate, endDate) => {
//     if (!startDate || !endDate) return NaN;
//     return endDate.diff(startDate, "days") + 1;
//   };

//   const onFinish = async (values) => {
//     const [startDate, endDate] = values.leaveDates || [];
//     const leaveDays = calculateLeaveDays(startDate, endDate);

//     if (leaveDays > remainingLeaves) {
//       notification.error({
//         message: "Insufficient Leave Balance",
//         description: `You have only ${remainingLeaves} days remaining.`,
//       });
//       return;
//     }

//     const newLeaveRequest = {
//       employee_id: employeeInfo.id,
//       leaveType: values.leaveType,
//       startDate: startDate.format("YYYY-MM-DD"),
//       endDate: endDate.format("YYYY-MM-DD"),
//       leaveReason: values.leaveReason,
//       daysRequested: leaveDays,
//     };

//     try {
//       await axios.post("http://localhost:5000/apply-leave", newLeaveRequest);

//       setRemainingLeaves((prev) => prev - leaveDays);
//       setTotalDaysUsed((prev) => prev + leaveDays);
//       setLeaveHistory((prev) => [...prev, { ...newLeaveRequest, status: "Pending" }]);

//       notification.success({
//         message: "Leave Application Sent",
//         description: "Your leave request has been submitted.",
//       });

//       setCurrentStep(1);
//     } catch (error) {
//       notification.error({
//         message: "Error",
//         description: "Failed to apply for leave. Please try again.",
//       });
//     }
//   };

//   const columns = [
//     { title: "Leave Type", dataIndex: "leaveType", key: "leaveType" },
//     { title: "Start Date", dataIndex: "startDate", key: "startDate", render: (date) => moment(date).format("DD-MM-YYYY") },
//     { title: "End Date", dataIndex: "endDate", key: "endDate", render: (date) => moment(date).format("DD-MM-YYYY") },
//     { title: "Days Requested", dataIndex: "daysRequested", key: "daysRequested" },
//     { title: "Status", dataIndex: "status", key: "status" },
//   ];

//   return (
//     <div className="main">
//       <Layout>
//         <Sidebar />
//         <Layout className="content-layout">
//           <Header className="header">
//             <Title level={2} className="header-title">Leave Application Form</Title>
//             <Button type="default" className="back-button" onClick={() => navigate('/dashboard')}>Back</Button>
//           </Header>
//           <Content style={{ padding: "20px" }}>
//             {leaveLimitReached && (
//               <Alert
//                 message="Leave Limit Reached"
//                 description="You have used all your available leave days. You cannot apply for more leave."
//                 type="warning"
//                 showIcon
//                 style={{ marginBottom: "20px" }}
//               />
//             )}
//             <Row gutter={[16, 16]}>
//               <Col xs={24} md={16}>
//                 <Card title="Compose Leave" className="compose-card">
//                   <Form form={form} layout="vertical" onFinish={onFinish}>
//                     <Row gutter={16}>
//                       <Col xs={24} sm={12}>
//                         <Form.Item name="employee_id" label="Employee ID">
//                           <Input disabled />
//                         </Form.Item>
//                       </Col>
//                       <Col xs={24} sm={12}>
//                         <Form.Item name="employeeName" label="Employee Name">
//                           <Input disabled />
//                         </Form.Item>
//                       </Col>
//                     </Row>
//                     <Row gutter={16}>
//                       <Col xs={24} sm={12}>
//                         <Form.Item name="leaveType" label="Leave Type" rules={[{ required: true, message: 'Please select leave type' }]}>
//                           <Select placeholder="Select Leave Type" disabled={leaveLimitReached}>
//                             <Select.Option value="l1">Leave 1</Select.Option>
//                             <Select.Option value="l2">Leave 2</Select.Option>
//                             <Select.Option value="l3">Leave 3</Select.Option>
//                             <Select.Option value="l4">Leave 4</Select.Option>
//                           </Select>
//                         </Form.Item>
//                       </Col>
//                       <Col xs={24} sm={12}>
//                         <Form.Item name="leaveDates" label="Leave Duration" rules={[{ required: true, message: 'Please select leave duration' }]}>
//                           <RangePicker format="DD-MM-YYYY" disabled={leaveLimitReached} />
//                         </Form.Item>
//                       </Col>
//                     </Row>
//                     <Form.Item label="Already Used Leave">
//                       <div className="leave-summary">Total Used Leave: {totalDaysUsed} days</div>
//                     </Form.Item>
//                     <Form.Item name="leaveReason" label="Reason for Leave" rules={[{ required: true, message: 'Please provide a reason for leave' }]}>
//                       <TextArea rows={4} placeholder="Explain the reason for your leave..." disabled={leaveLimitReached} />
//                     </Form.Item>
//                     <Form.Item>
//                       <Button type="primary" htmlType="submit" disabled={leaveLimitReached}>Apply Leave</Button>
//                     </Form.Item>
//                   </Form>
//                 </Card>
//               </Col>
//               <Col xs={24} md={8}>
//                 <Card title="Leave Policy" className="policy-card">
//                   <p>You are entitled to 21 paid leave days per year.</p>
//                   <p>Total Paid Leave Balance: {remainingLeaves} days</p>
//                   <p>Total Leaves Used: {totalDaysUsed} days</p>
//                 </Card>
//                 <Card title="Leave History" className="history-card" style={{ marginTop: "16px" }}>
//                   <Table
//                     columns={columns}
//                     dataSource={leaveHistory.map(item => ({ ...item, key: item._id || item.startDate }))}
//                     pagination={{ pageSize: 5 }}
//                   />
//                 </Card>

//                 <Card title="Leave Approval Process" className="steps-card" style={{ marginTop: "16px" }}>
//                   <Steps direction="vertical" current={currentStep}>
//                     <Step title="Step 1" description="Leave application submitted to RM." />
//                     <Step title="Step 2" description="Waiting for RM review..." />
//                     <Step title="Step 3" description="Leave Approved by RM." />
//                     <Step title="Step 4" description="Leave Rejected by RM." />
//                   </Steps>
//                 </Card>
//               </Col>
//             </Row>
//           </Content>
//         </Layout>
//       </Layout>
//     </div>
//   );
// };

// export default LeaveApplication;

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Card, Col, Row, Layout, Typography, Table, DatePicker, Select, Alert } from 'antd';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './LeaveApplication.css';

const { TextArea } = Input;
const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const LeaveApplication = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [employeeInfo, setEmployeeInfo] = useState({ id: '', name: '', email: '' });
  const [remainingLeaves, setRemainingLeaves] = useState(21);
  const [totalDaysUsed, setTotalDaysUsed] = useState(0);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [leaveLimitReached, setLeaveLimitReached] = useState(false);

  useEffect(() => {
    const fetchEmployeeInfo = async () => {
      const employeeData = await getEmployeeInfo();
      setEmployeeInfo(employeeData);
      form.setFieldsValue({
        employee_id: employeeData.id,
        employeeName: employeeData.name,
      });
      await fetchLeaveSummary(employeeData.id);
    };
    fetchEmployeeInfo();
  }, [form]);

  const getEmployeeInfo = async () => {
    return { id: 'EMP12345', name: 'Dotsito EMP', email: 'johndoe@example.com' };
   
  };
  

  const fetchLeaveSummary = async (employeeId) => {
    try {
      const response = await axios.get(`http://localhost:5000/leave-summary/${employeeId}`);
      const { remainingDays, totalDaysUsed, leaveHistory } = response.data;
      setLeaveHistory(leaveHistory);
      setTotalDaysUsed(totalDaysUsed);
      setRemainingLeaves(remainingDays);
      setLeaveLimitReached(remainingDays <= 0);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch leave history.',
      });
    }
  };

  const calculateLeaveDays = (startDate, endDate) => {
    if (!startDate || !endDate) return NaN;
    return endDate.diff(startDate, 'days') + 1;
  };

  const onFinish = async (values) => {
    const [startDate, endDate] = values.leaveDates || [];
    const leaveDays = calculateLeaveDays(startDate, endDate);

    if (leaveDays > remainingLeaves) {
      notification.error({
        message: 'Insufficient Leave Balance',
        description: `You have only ${remainingLeaves} days remaining.`,
      });
      return;
    }

    const newLeaveRequest = {
      employee_id: employeeInfo.id,
      leaveType: values.leaveType,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      leaveReason: values.leaveReason,
      daysRequested: leaveDays,
    };

    try {
      await axios.post('http://localhost:5000/apply-leave', newLeaveRequest);

      setRemainingLeaves((prev) => prev - leaveDays);
      setTotalDaysUsed((prev) => prev + leaveDays);
      setLeaveHistory((prev) => [...prev, { ...newLeaveRequest, status: 'Pending' }]);

      notification.success({
        message: 'Leave Application Sent',
        description: 'Your leave request has been submitted.',
      });
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to apply for leave. Please try again.',
      });
    }
  };

  const columns = [
    { title: 'Leave Type', dataIndex: 'leaveType', key: 'leaveType' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate', render: (date) => moment(date).format('DD-MM-YYYY') },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate', render: (date) => moment(date).format('DD-MM-YYYY') },
    { title: 'Days Requested', dataIndex: 'daysRequested', key: 'daysRequested' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  return (
    <div className="main">
      <Layout>
        <Sidebar />
        <Layout className="content-layout">
          <Header className="header">
            <Title level={2} className="header-title">Leave Application Form</Title>
            <Button type="default" className="back-button" onClick={() => navigate('/dashboard')}>Back</Button>
          </Header>
          <Content style={{ padding: '20px' }}>
            {leaveLimitReached && (
              <Alert
                message="Leave Limit Reached"
                description="You have used all your available leave days. You cannot apply for more leave."
                type="warning"
                showIcon
                style={{ marginBottom: '20px' }}
              />
            )}
            <Row gutter={[16, 16]}>
              <Col xs={24} md={16}>
                <Card title="Compose Leave" className="compose-card">
                  <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <Form.Item name="employee_id" label="Employee ID">
                          <Input disabled />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item name="employeeName" label="Employee Name">
                          <Input disabled />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <Form.Item name="leaveType" label="Leave Type" rules={[{ required: true, message: 'Please select leave type' }]}>
                          <Select placeholder="Select Leave Type" disabled={leaveLimitReached}>
                            <Option value="l1">Leave 1</Option>
                            <Option value="l2">Leave 2</Option>
                            <Option value="l3">Leave 3</Option>
                            <Option value="l4">Leave 4</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item name="leaveDates" label="Leave Duration" rules={[{ required: true, message: 'Please select leave duration' }]}>
                          <RangePicker format="DD-MM-YYYY" disabled={leaveLimitReached} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item label="Already Used Leave">
                      <div className="leave-summary">Total Used Leave: {totalDaysUsed} days</div>
                    </Form.Item>
                    <Form.Item name="leaveReason" label="Reason for Leave" rules={[{ required: true, message: 'Please provide a reason for leave' }]}>
                      <TextArea rows={4} placeholder="Explain the reason for your leave..." disabled={leaveLimitReached} />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" disabled={leaveLimitReached}>Apply Leave</Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card title="Leave Policy" className="policy-card">
                  <p>You are entitled to 21 paid leave days per year.</p>
                  <p>Total Paid Leave Balance: {remainingLeaves} days</p>
                  <p>Total Leaves Used: {totalDaysUsed} days</p>
                </Card>
                <Card title="Leave History" className="history-card" style={{ marginTop: '16px' }}>
                  <Table
                    columns={columns}
                    dataSource={leaveHistory.map(item => ({ ...item, key: item._id || item.startDate }))}
                    pagination={{ pageSize: 5 }}
                  />
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LeaveApplication;
