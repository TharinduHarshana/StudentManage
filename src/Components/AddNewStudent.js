import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddStudent = () => {
    const [student, setStudent] = useState({
        ApplicationID: '',
        FullName: '',
        NameWithInitials: '',
        BDay: new Date(),
        IDNo: '',
        TenNumber: '',
        NameOfTheGuardian: '',
        Address: '',
        income: '',
        skills: '',
        Achievements: '',
        School: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let key in student) {
            if (student[key] === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please fill all the fields!',
                });
                return;
            }
        }

        const formattedStudent = {
            ...student,
            BDay: student.BDay.toISOString().split('T')[0]
        };

        axios.post('https://st-mng-server-a.vercel.app/api/student/add', formattedStudent)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Student added successfully!',
                });
                setStudent({
                    ApplicationID: '',
                    FullName: '',
                    NameWithInitials: '',
                    BDay: new Date(),
                    IDNo: '',
                    TenNumber: '',
                    NameOfTheGuardian: '',
                    Address: '',
                    income: '',
                    skills: '',
                    Achievements: '',
                    School: ''
                });
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong!',
                });
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setStudent(prevState => ({
            ...prevState,
            BDay: date
        }));
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Add New Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="ApplicationID">Application ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="ApplicationID"
                        name="ApplicationID"
                        value={student.ApplicationID}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="FullName">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="FullName"
                        name="FullName"
                        value={student.FullName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="NameWithInitials">Name With Initials</label>
                    <input
                        type="text"
                        className="form-control"
                        id="NameWithInitials"
                        name="NameWithInitials"
                        value={student.NameWithInitials}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="BDay">Birth Day</label>
                    <DatePicker
                        selected={student.BDay}
                        onChange={handleDateChange}
                        className="form-control"
                        id="BDay"
                        name="BDay"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="IDNo">ID Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="IDNo"
                        name="IDNo"
                        value={student.IDNo}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="TenNumber">Telephone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="TenNumber"
                        name="TenNumber"
                        value={student.TenNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="NameOfTheGuardian">Name Of The Guardian</label>
                    <input
                        type="text"
                        className="form-control"
                        id="NameOfTheGuardian"
                        name="NameOfTheGuardian"
                        value={student.NameOfTheGuardian}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="Address">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Address"
                        name="Address"
                        value={student.Address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="income">Income</label>
                    <input
                        type="text"
                        className="form-control"
                        id="income"
                        name="income"
                        value={student.income}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="skills">Skills</label>
                    <input
                        type="text"
                        className="form-control"
                        id="skills"
                        name="skills"
                        value={student.skills}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="Achievements">Achievements</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Achievements"
                        name="Achievements"
                        value={student.Achievements}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="School">School</label>
                    <input
                        type="text"
                        className="form-control"
                        id="School"
                        name="School"
                        value={student.School}
                        onChange={handleChange}
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary ">Add Student</button>
                </div>
            </form>
        </div>
    );
};

export default AddStudent;