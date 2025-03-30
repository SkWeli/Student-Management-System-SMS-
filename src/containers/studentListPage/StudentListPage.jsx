import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import axios from 'axios';
import './studentListPage.css';

const StudentListPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found, please log in.');
        }
        const response = await axios.get('http://localhost:8080/api/students', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setStudents(response.data);
        setFilteredStudents(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to fetch students. Please log in again.');
        setLoading(false);
        if (err.response && err.response.status === 401) {
          navigate('/login'); // Redirect to login on 401
        }
      }
    };

    fetchStudents();
  }, [navigate]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = students.filter(
      (student) =>
        student.firstName.toLowerCase().includes(query) ||
        student.lastName.toLowerCase().includes(query) ||
        student.idNumber.toLowerCase().includes(query)
    );
    setFilteredStudents(filtered);
  };

  const handleDoubleClick = (id) => {
    navigate(`/student-detail/${id}`);
  };

  const formatStudentNumber = (id) => {
    return String(id).padStart(8, '0');
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between mb-3">
        <div className="input-group" style={{ maxWidth: '700px' }}>
          <span className="input-group-text">
            <IoSearchOutline />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search for a student by name or ID"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Link to="/add-new-student">
          <button className="btn btn-primary">Add New Student</button>
        </Link>
      </div>

      {loading ? (
        <p>Loading students...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
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
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.studentNumber}
                    onDoubleClick={() => handleDoubleClick(student.studentNumber)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{formatStudentNumber(student.id)}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.degree}</td>
                    <td>{student.idNumber}</td>
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
      )}
    </div>
  );
};

export default StudentListPage;