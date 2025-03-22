import React from "react";

import { Header, Footer} from './components';
import { StudentListPage, AddNewStudent} from './containers';

const App = () => {
  return (
    <div className="App">
      <Header/>
      <div className="container">
      
      <AddNewStudent/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
