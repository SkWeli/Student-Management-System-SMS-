import React from "react";

import { Header, Footer} from './components';
import { StudentListPage} from './containers';

const App = () => {
  return (
    <div className="App">
      <Header/>
      <div className="container">
      
      <StudentListPage/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
