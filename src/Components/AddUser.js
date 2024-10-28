import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    // Add user function
    function handleSubmit(e) {
        e.preventDefault();
        const user = { username, password, role };

        // Check if the user added data
        if (username === '' || password === '' || role === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields!',
            });
            return;
        }

        const newUser = { username, password, role };
        console.log(newUser);

        axios.post('https://st-mng-server-a.vercel.app/api/user/add', newUser)
            .then(res => console.log(res.data))
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong!',
                });
            });

        Swal.fire({
            icon: 'success',
            title: 'User added successfully!',
        });

        // Clear form fields after submission
        setUsername('');
        setPassword('');
        setRole('user');
    }

    return (
        <div className="container mt-5">
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    />
                </div>
                <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select
                            className="form-control"
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="database-manager">Database Manager</option>
                        </select>
                    </div>
                <button type="submit" className="btn btn-primary mt-3">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;