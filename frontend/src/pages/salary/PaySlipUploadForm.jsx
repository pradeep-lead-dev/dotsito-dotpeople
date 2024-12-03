import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Typography, message } from "antd";
import Sidebar from "../../components/Sidebar";
import './Payslip.css';
const { Title } = Typography;

const PaySlipUploadForm = () => {
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async () => {
    try {
      const payload = { empId, empName, month, year, url };
      const response = await axios.post("http://localhost:5000/payslip", payload);
      if (response.status === 201) {
        message.success("Pay slip uploaded successfully!");
      }
    } catch (error) {
      message.error("Error uploading pay slip");
    }
  };

  return (
    <div className="main">
      <Sidebar />
      <div style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
        <Title level={3}>Upload Employee Pay Slip</Title>
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <Button type="default" onClick={() => navigate('/Dashboard')}>
          Back
        </Button>
      </div>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Employee ID" required>
            <Input
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              placeholder="Enter Employee ID"
            />
          </Form.Item>

          <Form.Item label="Employee Name" required>
            <Input
              value={empName}
              onChange={(e) => setEmpName(e.target.value)}
              placeholder="Enter Employee Name"
            />
          </Form.Item>

          <Form.Item label="Month" required>
            <Input
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="Enter Month"
            />
          </Form.Item>

          <Form.Item label="Year" required>
            <Input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter Year"
            />
          </Form.Item>

          <Form.Item label="Pay Slip URL" required>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter Pay Slip URL"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Upload Pay Slip
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PaySlipUploadForm;
