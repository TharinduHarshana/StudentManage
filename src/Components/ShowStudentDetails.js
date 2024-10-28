import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/TableStyle.css';
import EditStudentModal from '../Components/EditStudentModel';

const StudentsTable = () => {
    const [students, setStudents] = useState([]);
    const [editStudent, setEditStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        handleSearch(searchTerm);
    }, [searchTerm, students]);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('https://st-mng-server-a.vercel.app/api/student');
            if (response.data.success && Array.isArray(response.data.data)) {
                setStudents(response.data.data);
            } else {
                console.error("Data fetched is not an array", response.data);
                setStudents([]);
            }
        } catch (err) {
            console.error(err);
            setStudents([]);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://st-mng-server-a.vercel.app/api/student/${id}`);
                    setStudents(students.filter(student => student._id !== id));
                    Swal.fire('Deleted!', 'Student has been deleted.', 'success');
                } catch (err) {
                    Swal.fire('Error!', 'Something went wrong.', 'error');
                }
            }
        });
    };
    
    const handleEdit = (student) => {
        setEditStudent(student);
    };

    const handleUpdate = async (updatedStudent) => {
        try {
            await axios.patch(`https://st-mng-server-a.vercel.app/api/student/${updatedStudent._id}`, updatedStudent);
            setStudents(students.map(student => (student._id === updatedStudent._id ? updatedStudent : student)));
            setEditStudent(null);
            Swal.fire('Updated!', 'Student has been updated.', 'success');
        } catch (err) {
            Swal.fire('Error!', 'Something went wrong.', 'error');
        }
    };

    const handleSearch = (term) => {
        const filtered = students.filter(student => {
            return (
                student.ApplicationID.toLowerCase().includes(term.toLowerCase()) ||
                student.FullName.toLowerCase().includes(term.toLowerCase())
            );
        });
        setFilteredStudents(filtered);
    };

    return (
        <div>
            <h2 className="mb-4 text-center">Students List</h2>
            <div className="d-flex justify-content-center mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Application ID or Student Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ maxWidth: '500px' }}
                />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Application ID</th>
                        <th>Full Name</th>
                        <th>Name With Initials</th>
                        <th>Birth Date</th>
                        <th>ID No</th>
                        <th>Ten Number</th>
                        <th>Name Of The Guardian</th>
                        <th>Address</th>
                        <th>Income</th>
                        <th>Skills</th>
                        <th>Achievements</th>
                        <th>School</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map(student => (
                        <tr key={student._id}>
                            <td>{student.ApplicationID}</td>
                            <td>{student.FullName}</td>
                            <td>{student.NameWithInitials}</td>
                            <td>{student.BDay}</td>
                            <td>{student.IDNo}</td>
                            <td>{student.TenNumber}</td>
                            <td>{student.NameOfTheGuardian}</td>
                            <td>{student.Address}</td>
                            <td>{student.income}</td>
                            <td>{student.skills}</td>
                            <td>{student.Achievements}</td>
                            <td>{student.School}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(student)}>Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editStudent && (
                <EditStudentModal
                    student={editStudent}
                    onUpdate={handleUpdate}
                    onClose={() => setEditStudent(null)}
                />
            )}
        </div>
    );
};

export default StudentsTable;
