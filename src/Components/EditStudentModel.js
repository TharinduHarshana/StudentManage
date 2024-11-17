import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";

const EditformDataModal = ({ student, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    BDay: null,
    ...student,
  });

  useEffect(() => {
    setFormData({
      BDay: student?.BDay ? new Date(student.BDay) : null,
      ...student,
    });
  }, [student]);

  const handleChange = (section, field, value) => {
    setFormData((prevState) => ({
        ...prevState,
        [section]: {
            ...prevState[section],
            [field]: value
        }
    }));
};


  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      BDay: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData); // Pass updated data to the parent
  };

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit formData</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleSubmit}>
                {/* General fields */}
                <div className="form-group mb-3">
                    <label htmlFor="ApplicationID">Application ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="ApplicationID"
                        name="ApplicationID"
                        value={formData.ApplicationID || ""}
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
                        value={formData.FullName || ""}
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
                            value={formData.NameWithInitials || ""}
                            onChange={handleChange}
                        />
                    
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="BDay">Birth Day</label>
                    <DatePicker
                        selected={formData.BDay}
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
                                checked={formData.Gender === "Male"}
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
                                checked={formData.Gender === "Female"}
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
                            value={formData.skills || ""}
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
                            value={formData.Achievements || ""}
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
                            value={formData.VillageSecretariat || ""}
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
                        value={formData.DivisionalSecretariat || ""}
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
                        value={formData.Address || ""}
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
                        value={formData.Pnum.Mobile || ""}
                        onChange={(e) => handleChange('Pnum', 'Mobile', e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="PnumHome">Home</label>
                    <input
                        type="text"
                        className="form-control"
                        id="PnumHome"
                        value={formData.Pnum.Home || ""}
                        onChange={(e) => handleChange('Pnum', 'Home', e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="PnumWhatsapp">WhatsApp</label>
                    <input
                        type="text"
                        className="form-control"
                        id="PnumWhatsapp"
                        value={formData.Pnum.Whatsapp || ""}
                        onChange={(e) => handleChange('Pnum', 'Whatsapp', e.target.value)}
                    />
                </div>
                <div>
                    <h5 className="mt-4">A/L Subjects</h5>
                    <div className="form-group mb-3">
                        <label htmlFor="Stream">Stream</label>
                        <select
                            className="form-control"
                            id="Stream"
                            value={formData.ALSubjects.Stream || ""}
                            onChange={(e) => handleChange('ALSubjects', 'Stream', e.target.value)}
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
                            value={formData.ALSubjects.Sub1 || ""}
                            onChange={(e) => handleChange('ALSubjects', 'Sub1', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Sub2">Subject 2</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Sub2"
                            value={formData.ALSubjects.Sub2 || ""}
                            onChange={(e) => handleChange('ALSubjects', 'Sub2', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Sub3">Subject 3</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Sub3"
                            value={formData.ALSubjects.Sub3 || ""}
                            onChange={(e) => handleChange('ALSubjects', 'Sub3', e.target.value)}
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
                            value={formData.OLResults.Mathematics || ""}
                            onChange={(e) => handleChange('OLResults', 'Mathematics', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Science">Science</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Science"
                            value={formData.OLResults.Science || ""}
                            onChange={(e) => handleChange('OLResults', 'Science', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Sinhala">Sinhala</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Sinhala"
                            value={formData.OLResults.Sinhala || ""}
                            onChange={(e) => handleChange('OLResults', 'Sinhala', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="English">English</label>
                        <input
                            type="text"
                            className="form-control"
                            id="English"
                            value={formData.OLResults.English || ""}
                            onChange={(e) => handleChange('OLResults', 'English', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Buddhism">Buddhism</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Buddhism"
                            value={formData.OLResults.Buddhism || ""}
                            onChange={(e) => handleChange('OLResults', 'Buddhism', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="History">History</label>
                        <input
                            type="text"
                            className="form-control"
                            id="History"
                            value={formData.OLResults.History    || ""}
                            onChange={(e) => handleChange('OLResults', 'History', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="SectionI">Section I</label>
                        <input
                            type="text"
                            className="form-control"
                            id="SectionI"
                            value={formData.OLResults.SectionI || ""}
                            onChange={(e) => handleChange('OLResults', 'SectionI', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="SectionII">Section II</label>
                        <input
                            type="text"
                            className="form-control"
                            id="SectionII"
                            value={formData.OLResults.SectionII || ""}
                            onChange={(e) => handleChange('OLResults', 'SectionII', e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="SectionIII">Section III</label>
                        <input
                            type="text"
                            className="form-control"
                            id="SectionIII"
                            value={formData.OLResults.SectionIII || ""}
                            onChange={(e) => handleChange('OLResults', 'SectionIII', e.target.value)}
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
                            value={formData.IDNo || ""}
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
                            value={formData.NumOfBirthCertificate || ""}
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
                            value={formData.BrotherSisters.FullName || ""}
                            onChange={(e) =>
                                handleChange('BrotherSisters', 'FullName', e.target.value)
                            }
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="BrotherSistersClass">Class</label>
                        <input
                            type="text"
                            className="form-control"
                            id="BrotherSistersClass"
                            value={formData.BrotherSisters.Class || ""}
                            onChange={(e) =>
                                handleChange('BrotherSisters', 'Class', e.target.value)
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
                            value={formData.Guardiance.FullName     || "" }
                            onChange={(e) =>
                                handleChange('Guardiance', 'FullName', e.target.value)
                            }
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="GuardianceJob">Job</label>
                        <input
                            type="text"
                            className="form-control"
                            id="GuardianceJob"
                            value={formData.Guardiance.Job   || ""}
                            onChange={(e) =>
                                handleChange('Guardiance', 'Job', e.target.value)
                            }
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="GuardiancePnum">Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="GuardiancePnum"
                            value={formData.Guardiance.Pnum || ""}
                            onChange={(e) =>
                                handleChange('Guardiance', 'Pnum', e.target.value)
                            }
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="GuardianceIDNo">ID Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="GuardianceIDNo"
                            value={formData.Guardiance.IDNo || ""}
                            onChange={(e) =>
                                handleChange('Guardiance', 'IDNo', e.target.value)
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
                            value={formData.MethodToComeSchool || ""}
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
                            value={formData.income || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <Button variant="primary" type="submit">Save Changes</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EditformDataModal;
