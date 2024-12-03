import React, { useState, useEffect } from "react";
import { Table, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

const PaySlipTable = () => {
  const [paySlips, setPaySlips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaySlips = async () => {
      try {
        const response = await axios.get("http://localhost:5000/payslip");
        console.log("response:", response);
        setPaySlips(response.data);
      } catch (error) {
        console.error("Error fetching pay slips:", error);
      }
    };
    fetchPaySlips();
  }, []);

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empId",
      key: "empId",
    },
    {
      title: "Employee Name",
      dataIndex: "empName",
      key: "empName",
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Pay Slip",
      dataIndex: "url",
      key: "url",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          View Pay Slip
        </a>
      ),
    },
  ];

  return (
    <div>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <Button type="default" onClick={() => navigate('/Dashboard')}>
          Back
        </Button>
      </div>
      <Title level={2}>Pay Slips</Title>
      <Table
        columns={columns}
        dataSource={paySlips}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default PaySlipTable;
