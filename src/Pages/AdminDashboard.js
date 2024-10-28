import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Statistic, Button, Row, Col } from 'antd';
import { TeamOutlined, PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const AdminDashBoard = () => {
    const [studentCount, setStudentCount] = useState(0);

    useEffect(() => {
        getStudentCount();
    }, []);

    const getStudentCount = async () => {
        try {
            const response = await axios.get('https://st-mng-server-a.vercel.app/api/student/count');
            setStudentCount(response.data.data);
        } catch (error) {
            console.error('Error getting student count:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="display-4">Student Management System</h1>
                <p className="lead">Welcome to the Student Management System</p>
                <hr className="my-4" />
                <Row gutter={16}>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="Total Students"
                                value={studentCount}
                                valueStyle={{ color: "#1890ff" }}
                                prefix={<TeamOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>
                <div className="mt-4">
                    <Link to="/add-student">
                        <Button type="primary" icon={<PlusOutlined />} style={{ marginRight: '10px' }}>
                            Add New Student
                        </Button>
                    </Link>
                    <Link to="/students">
                        <Button type="primary" icon={<UserAddOutlined />} style={{ marginRight: '10px' }}>
                            See Student List
                        </Button>
                    </Link>
                    <Link to="/add-user">
                        <Button type="primary" icon={<PlusOutlined />} style={{ marginRight: '10px' }}>
                            Add New User
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashBoard;
