import React from "react";

import { StudentForm, StudentList, Header, Footer} from './components';

const App = () => {
  return (
    <div className="App">
      <Header/>
      <div className="container">
      <StudentForm/>
      <StudentList/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
