import React from "react";
import './studentList.css';

const StudentList = () => {
  const dummyStudents = [
    { studentNumber: 'S001', firstName: 'John', lastName: 'Doe', degree: 'Computer Science', studentId: 'ID123', birthday: '2000-01-01' },
    { studentNumber: 'S002', firstName: 'Jane', lastName: 'Smith', degree: 'Mathematics', studentId: 'ID124', birthday: '1999-05-15' },
    { studentNumber: 'S003', firstName: 'Bob', lastName: 'Johnson', degree: 'Physics', studentId: 'ID125', birthday: '2001-03-22' },
  ];

  return (
    <div className="mt-4">
      <h2 className="text-center mb-4" style={{ color: '#333' }}>Registered Students</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
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
                <tr key={student.studentNumber}>
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

export default StudentList;