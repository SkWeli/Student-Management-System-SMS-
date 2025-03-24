import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import "./studentListPage.css";

const StudentListPage = () => {
  const navigate = useNavigate();

  const dummyStudents = [
    { studentNumber: '00001541', firstName: 'Sasini', lastName: 'Lekamge', degree: 'Computer Science', studentId: '054760', birthday: '2001-01-01' },
    { studentNumber: '00001542', firstName: 'Dinuka', lastName: 'Wickramasinghe', degree: 'Computer Science', studentId: '054368', birthday: '2002-05-05' },
    { studentNumber: '00001543', firstName: 'Tharuka', lastName: 'Bandara', degree: 'Computer Science', studentId: '051564', birthday: '2002-01-05' },
    { studentNumber: '00001544', firstName: 'Nuwandu', lastName: 'Kithara', degree: 'Software Engineering', studentId: '052356', birthday: '2001-01-05' },
    { studentNumber: '00001545', firstName: 'Senudu', lastName: 'Wickrama', degree: 'Software Engineering', studentId: '058644', birthday: '2002-06-12' },
    { studentNumber: '00001546', firstName: 'Hasindu', lastName: 'Nimesh', degree: 'Computer Science', studentId: '056156', birthday: '2003-03-14' },
    { studentNumber: '00001547', firstName: 'Thenuke', lastName: 'Perera', degree: 'Computer Engineering', studentId: '056156', birthday: '2001-01-12' },
    { studentNumber: '00001548', firstName: 'Tironi', lastName: 'de Silva', degree: 'Data Science', studentId: '056546', birthday: '2000-07-05' },
    { studentNumber: '00001549', firstName: 'Udani', lastName: 'Amaraja', degree: 'Data Science', studentId: '058795', birthday: '2000-04-05' },
    { studentNumber: '00001550', firstName: 'Maithi', lastName: 'Induwari', degree: 'Information Technology', studentId: '056165', birthday: '2011-10-15' },
    { studentNumber: '00001551', firstName: 'Haritha', lastName: 'Naveen', degree: 'Information Systems', studentId: '057889', birthday: '2012-05-05' },
    { studentNumber: '00001550', firstName: 'Sumudu', lastName: 'Rathnayake', degree: 'Computer Science', studentId: '056165', birthday: '2011-10-15' },
  ];

  // Function to handle double-click navigation
  const handleDoubleClick = (studentId) => {
    navigate(`/student-detail/${studentId}`); // Navigate to StudentDetailSheet with studentId
  };

  return (
    <div className="mt-4">
      {/* Search Bar and Add New Students Button */}
      <div className="d-flex justify-content-between mb-3">
        <div className="input-group" style={{ maxWidth: '700px' }}>
        <span className="input-group-text">
            <IoSearchOutline />
        </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search for a student by name or ID"
          />
        </div>
        <Link to="/add-new-student">
        <button className="btn btn-primary">
          Add New Student
        </button>
        </Link>
        </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-primary text-white">
            <tr>
              <th>Student Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Degree</th>
              <th>Student ID</th>
              <th>Birthday</th>
            </tr>
          </thead>
          <tbody>
            {dummyStudents.length > 0 ? (
              dummyStudents.map((student) => (
                <tr 
                  key={student.studentNumber}
                  onDoubleClick={() => handleDoubleClick(student.studentId)} // Add double-click handler
                  style={{ cursor: 'pointer' }} // Optional: Add pointer cursor to indicate clickable row
                >
                  <td>{student.studentNumber}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.degree}</td>
                  <td>{student.studentId}</td>
                  <td>{student.birthday}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No students available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentListPage;