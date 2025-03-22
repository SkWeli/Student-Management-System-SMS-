import React from "react";

import { Header, Footer} from './components';
import { StudentListPage, AddNewStudent, StudentDetailSheet} from './containers';

const App = () => {
  return (
    <div className="App">
      <Header/>
      <div className="container">
      
      <StudentDetailSheet/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
