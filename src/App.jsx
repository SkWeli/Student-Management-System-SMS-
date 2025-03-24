import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer} from './components';
import { StudentListPage, AddNewStudent, StudentDetailSheet, CourseHistory, EditStudent, LogIn} from './containers';

const App = () => {
  return (
    <div className="App">
      <Router>
      <Header/>
      <div className="container">
      <Routes>
            {/* Default route: Student List Page */}
            <Route path="/" element={<StudentListPage />} />
            {/* Route for Add New Student */}
            <Route path="/add-new-student" element={<AddNewStudent />} />
            {/* Route for Student Detail Sheet (using studentId as a parameter) */}
            <Route path="/student-detail/:studentId" element={<StudentDetailSheet />} />
            {/* Route for Course History (using studentId as a parameter) */}
            <Route path="/course-history/:studentId" element={<CourseHistory />} />
            {/* Route for Edit Student (using studentId as a parameter) */}
            <Route path="/edit-student/:studentId" element={<EditStudent />} />
      </Routes>   
      </div>
      <Footer/>
      </Router>
    </div>
  );
}

export default App;
