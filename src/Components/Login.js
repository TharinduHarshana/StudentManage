import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://st-mng-server-a.vercel.app/api/user/login', { username, password });
            if (response.data.success) {
                Swal.fire('Success', 'Logged in successfully', 'success');
                const { role } = response.data.user;

                // Redirect based on user role
                if (role === 'admin') {
                    navigate('/admin-dashboard');
                } else if (role === 'database-manager') {
                    navigate('/db-manager-dashboard');
                } else {
                    Swal.fire('Success', 'Logged in successfully', 'success');
                }
            } else {
                Swal.fire('Error', response.data.message, 'error');
            }
        } catch (error) {
            Swal.fire('Error',  'Username Password Incorrect', 'error');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card p-4" style={{ width: '300px' }}>
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
