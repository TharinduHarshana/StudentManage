import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditStudentModal = ({ student, onUpdate, onClose }) => {
    const [formData, setFormData] = useState({ ...student });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="ApplicationID">Application ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ApplicationID"
                            name="ApplicationID"
                            value={formData.ApplicationID}
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
                            value={formData.FullName}
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
                            value={formData.NameWithInitials}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="BDay">Birth Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="BDay"
                            name="BDay"
                            value={formData.BDay}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="IDNo">ID No</label>
                        <input
                            type="text"
                            className="form-control"
                            id="IDNo"
                            name="IDNo"
                            value={formData.IDNo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="TenNumber">Ten Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="TenNumber"
                            name="TenNumber"
                            value={formData.TenNumber}
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
                            value={formData.NameOfTheGuardian}
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
                            value={formData.Address}
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
                            value={formData.income}
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
                            value={formData.skills}
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
                            value={formData.Achievements}
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
                            value={formData.School}
                            onChange={handleChange}
                        />
                    </div>
                    <Button variant="primary" type="submit">Save Changes</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EditStudentModal;
