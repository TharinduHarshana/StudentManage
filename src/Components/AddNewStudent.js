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
        Gender: '',
        Address: '',
        VillageSecretariat: '',
        DivisionalSecretariat: '',
        Pnum: { Mobile: '', Home: '', Whatsapp: '' },
        ALSubjects: { Stream: '', Sub1: '', Sub2: '', Sub3: '' },
        OLResults: {
            Mathematics: '', Science: '', Sinhala: '', English: '', Buddhism: '',
            History: '', SectionI: '', SectionII: '', SectionIII: ''
        },
        IDNo: '',
        NumOfBirthCertificate: '',
        BrotherSisters: { FullName: '', Class: '' },
        Guardiance: { FullName: '', Job: '', Pnum: '', IDNo: '' },
        MethodToComeSchool: '',
        income: '',
        skills: '',
        Achievements: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNestedChange = (section, field, value) => {
        setStudent(prevState => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                [field]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let key in student) {
            if (
                typeof student[key] === 'object' &&
                !Object.values(student[key]).every(v => v !== '')
            ) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Please fill all fields in ${key}!`,
                });
                return;
            } else if (student[key] === '') {
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

        axios.post('http://localhost:8000/api/student/add', formattedStudent)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Student added successfully!',
                });
                setStudent({
                    ApplicationID: '',
                    FullName: '',
                    NameWithInitials: '',
                    BDay: new Date(),
                    Gender: '',
                    Address: '',
                    VillageSecretariat: '',
                    DivisionalSecretariat: '',
                    Pnum: { Mobile: '', Home: '', Whatsapp: '' },
                    ALSubjects: { Stream: '', Sub1: '', Sub2: '', Sub3: '' },
                    OLResults: {
                        Mathematics: '', Science: '', Sinhala: '', English: '', Buddhism: '',
                        History: '', SectionI: '', SectionII: '', SectionIII: ''
                    },
                    IDNo: '',
                    NumOfBirthCertificate: '',
                    BrotherSisters: { FullName: '', Class: '' },
                    Guardiance: { FullName: '', Job: '', Pnum: '', IDNo: '' },
                    MethodToComeSchool: '',
                    income: '',
                    skills: '',
                    Achievements: ''
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong!',
                });
            });
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
                {/* General fields */}
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
                        <label htmlFor="NameWithInitials">Name with Initials</label>
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
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="Gender">Gender</label>
                    <div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="Male"
                                name="Gender"
                                value="Male"
                                checked={student.Gender === "Male"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="Male">
                                Male
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="Female"
                                name="Gender"
                                value="Female"
                                checked={student.Gender === "Female"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="Female">
                                Female
                            </label>
                        </div>
                    </div>
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
                    <h5 className="mt-4">Secretariats</h5>
                    <div className="form-group mb-3">
                        <label htmlFor="VillageSecretariat">Village Secretariat</label>
                        <input
                            type="text"
                            className="form-control"
                            id="VillageSecretariat"
                            name="VillageSecretariat"
                            value={student.VillageSecretariat}
                            onChange={handleChange}
                        />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="DivisionalSecretariat">Divisional Secretariat</label>
                    <input
                        type="text"
                        className="form-control"
                        id="DivisionalSecretariat"
                        name="DivisionalSecretariat"
                        value={student.DivisionalSecretariat}
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

                {/* Nested fields */}
                <h5 className="mt-4">Contact Numbers</h5>
                <div className="form-group mb-3">
                    <label htmlFor="PnumMobile">Mobile</label>
                    <input
                        type="text"
                        className="form-control"
                        id="PnumMobile"
                        value={student.Pnum.Mobile}
                        onChange={(e) => handleNestedChange('Pnum', 'Mobile', e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="PnumHome">Home</label>
                    <input
                        type="text"
                        className="form-control"
                        id="PnumHome"
                        value={student.Pnum.Home}
                        onChange={(e) => handleNestedChange('Pnum', 'Home', e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="PnumWhatsapp">WhatsApp</label>
                    <input
                        type="text"
                        className="form-control"
                        id="PnumWhatsapp"
                        value={student.Pnum.Whatsapp}
                        onChange={(e) => handleNestedChange('Pnum', 'Whatsapp', e.target.value)}
                    />
                </div>
                <div>
                    <h5 className="mt-4">A/L Subjects</h5>
                    <div className="form-group mb-3">
                        <label htmlFor="Stream">Stream</label>
                        <select
                            className="form-control"
                            id="Stream"
                            value={student.ALSubjects.Stream}
                            onChange={(e) => handleNestedChange('ALSubjects', 'Stream', e.target.value)}
                        >
                            <option value="">Select Stream</option>
                            <option value="Science">Science Stream</option>
                            <option value="Mathematics">Mathematics Stream</option>
                            <option value="Technology">Technology Stream</option>
                            <option value="Commerce">Commerce Stream</option>
                            <option value="Art">Art Stream</option>
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Sub1">Subject 1</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Sub1"
                            value={student.ALSubjects.Sub1}
                            onChange={(e) => handleNestedChange('ALSubjects', 'Sub1', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Sub2">Subject 2</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Sub2"
                            value={student.ALSubjects.Sub2}
                            onChange={(e) => handleNestedChange('ALSubjects', 'Sub2', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Sub3">Subject 3</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Sub3"
                            value={student.ALSubjects.Sub3}
                            onChange={(e) => handleNestedChange('ALSubjects', 'Sub3', e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <h5 className="mt-4">O/L Results</h5>
                    <div className="form-group mb-3">
                        <label htmlFor="Mathematics">Mathematics</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Mathematics"
                            value={student.OLResults.Mathematics}
                            onChange={(e) => handleNestedChange('OLResults', 'Mathematics', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Science">Science</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Science"
                            value={student.OLResults.Science}
                            onChange={(e) => handleNestedChange('OLResults', 'Science', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Sinhala">Sinhala</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Sinhala"
                            value={student.OLResults.Sinhala}
                            onChange={(e) => handleNestedChange('OLResults', 'Sinhala', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="English">English</label>
                        <input
                            type="text"
                            className="form-control"
                            id="English"
                            value={student.OLResults.English}
                            onChange={(e) => handleNestedChange('OLResults', 'English', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Buddhism">Buddhism</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Buddhism"
                            value={student.OLResults.Buddhism}
                            onChange={(e) => handleNestedChange('OLResults', 'Buddhism', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="History">History</label>
                        <input
                            type="text"
                            className="form-control"
                            id="History"
                            value={student.OLResults.History}
                            onChange={(e) => handleNestedChange('OLResults', 'History', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="SectionI">Section I</label>
                        <input
                            type="text"
                            className="form-control"
                            id="SectionI"
                            value={student.OLResults.SectionI}
                            onChange={(e) => handleNestedChange('OLResults', 'SectionI', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="SectionII">Section II</label>
                        <input
                            type="text"
                            className="form-control"
                            id="SectionII"
                            value={student.OLResults.SectionII}
                            onChange={(e) => handleNestedChange('OLResults', 'SectionII', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="SectionIII">Section III</label>
                        <input
                            type="text"
                            className="form-control"
                            id="SectionIII"
                            value={student.OLResults.SectionIII}
                            onChange={(e) => handleNestedChange('OLResults', 'SectionIII', e.target.value)}
                        />
                    </div>
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
                        <label htmlFor="NumOfBirthCertificate">Number of Birth Certificate</label>
                        <input
                            type="text"
                            className="form-control"
                            id="NumOfBirthCertificate"
                            name="NumOfBirthCertificate"
                            value={student.NumOfBirthCertificate}
                            onChange={handleChange}
                        />
                    </div>

                    <h5 className="mt-4">Brother/Sisters Information</h5>
                    <div className="form-group mb-3">
                        <label htmlFor="BrotherSistersFullName">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="BrotherSistersFullName"
                            value={student.BrotherSisters.FullName}
                            onChange={(e) =>
                                handleNestedChange('BrotherSisters', 'FullName', e.target.value)
                            }
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="BrotherSistersClass">Class</label>
                        <input
                            type="text"
                            className="form-control"
                            id="BrotherSistersClass"
                            value={student.BrotherSisters.Class}
                            onChange={(e) =>
                                handleNestedChange('BrotherSisters', 'Class', e.target.value)
                            }
                        />
                    </div>

                    <h5 className="mt-4">Guardianship Information</h5>
                    <div className="form-group mb-3">
                        <label htmlFor="GuardianceFullName">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="GuardianceFullName"
                            value={student.Guardiance.FullName}
                            onChange={(e) =>
                                handleNestedChange('Guardiance', 'FullName', e.target.value)
                            }
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="GuardianceJob">Job</label>
                        <input
                            type="text"
                            className="form-control"
                            id="GuardianceJob"
                            value={student.Guardiance.Job}
                            onChange={(e) =>
                                handleNestedChange('Guardiance', 'Job', e.target.value)
                            }
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="GuardiancePnum">Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="GuardiancePnum"
                            value={student.Guardiance.Pnum}
                            onChange={(e) =>
                                handleNestedChange('Guardiance', 'Pnum', e.target.value)
                            }
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="GuardianceIDNo">ID Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="GuardianceIDNo"
                            value={student.Guardiance.IDNo}
                            onChange={(e) =>
                                handleNestedChange('Guardiance', 'IDNo', e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="MethodToComeSchool">Method to Come to School</label>
                        <input
                            type="text"
                            className="form-control"
                            id="MethodToComeSchool"
                            name="MethodToComeSchool"
                            value={student.MethodToComeSchool}
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

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Add Student</button>
                </div>
            </form>
        </div>
    );
};

export default AddStudent;
