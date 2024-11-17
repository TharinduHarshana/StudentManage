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
                console.log(response.data.data);
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
            const applicationID = student.ApplicationID || ''; // Fallback to empty string
            const fullName = student.FullName || ''; // Fallback to empty string
    
            return (
                applicationID.toLowerCase().includes(term.toLowerCase()) ||
                fullName.toLowerCase().includes(term.toLowerCase())
            );
        });
        setFilteredStudents(filtered);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options); // Formats as "October 13, 2007"
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
                        <th colSpan="7" className="text-center">Student Details</th>
                        <th colSpan="4" className="text-center">AL Subjects</th>
                        <th colSpan="9" className="text-center">OL Results</th>
                        <th colSpan="4" className="text-center">Family Details</th>
                        <th colSpan="2" className="text-center">Brothers/Sisters Details</th>
                        <th>Actions</th>
                    </tr>
                    <tr>
                        <th>Application ID</th>
                        <th>Full Name</th>
                        <th>Initials</th>
                        <th>Address</th>
                        <th>Birth Date</th>
                        <th>Gender</th>
                        <th>ID No</th>
                        <th>Stream</th>
                        <th>Subject 1</th>
                        <th>Subject 2</th>
                        <th>Subject 3</th>
                        <th>Mathematics</th>
                        <th>Science</th>
                        <th>Sinhala</th>
                        <th>English</th>
                        <th>Buddhism</th>
                        <th>History</th>
                        <th>Section I</th>
                        <th>Section II</th>
                        <th>Section III</th>
                        <th>Guardian Name</th>
                        <th>Guardian Job</th>
                        <th>Guardian Phone</th>
                        <th>Income</th>
                        <th>Brother/Sister Name</th>
                        <th>Brother/Sister Class</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map(student => (
                        <tr key={student._id}>
                            {/* Student Details */}
                            <td>{student.ApplicationID}</td>
                            <td>{student.FullName}</td>
                            <td>{student.NameWithInitials}</td>
                            <td>{student.Address}</td>
                            <td>{formatDate(student.BDay)}</td> {/* Formatted Birth Date */}
                            <td>{student.Gender}</td>
                            <td>{student.IDNo}</td>

                            {/* AL Subjects */}
                            <td>{student.ALSubjects?.Stream}</td>
                            <td>{student.ALSubjects?.Sub1}</td>
                            <td>{student.ALSubjects?.Sub2}</td>
                            <td>{student.ALSubjects?.Sub3}</td>

                            {/* OL Results */}
                            <td>{student.OLResults?.Mathematics}</td>
                            <td>{student.OLResults?.Science}</td>
                            <td>{student.OLResults?.Sinhala}</td>
                            <td>{student.OLResults?.English}</td>
                            <td>{student.OLResults?.Buddhism}</td>
                            <td>{student.OLResults?.History}</td>
                            <td>{student.OLResults?.SectionI}</td>
                            <td>{student.OLResults?.SectionII}</td>
                            <td>{student.OLResults?.SectionIII}</td>



                            {/* Family Details */}
                            <td>{student.Guardiance?.FullName}</td>
                            <td>{student.Guardiance?.Job}</td>
                            <td>{student.Guardiance?.Pnum}</td>
                            <td>{student.income}</td>

                            {/* Brothers/Sisters Details */}
                            <td>
                                {student.BrotherSisters && student.BrotherSisters.length > 0 ? (
                                    student.BrotherSisters.map((sibling, index) => (
                                        <div key={index}>{sibling.FullName}</div>
                                    ))
                                ) : (
                                    'N/A'
                                )}
                            </td>
                            <td>
                                {student.BrotherSisters && student.BrotherSisters.length > 0 ? (
                                    student.BrotherSisters.map((sibling, index) => (
                                        <div key={index}>{sibling.Class}</div>
                                    ))
                                ) : (
                                    'N/A'
                                )}
                            </td>


                            {/* Actions */}
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
