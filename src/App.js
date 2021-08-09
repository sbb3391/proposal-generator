import Home from './containers/Home.js';
import Navbar from './containers/Navbar';
import Edit from './components/Edit'
import NewMachine from './containers/NewMachine'

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router >
      <div className="App w-full h-full">
        <div className="w-full h-18">
          <Navbar />
        </div>
        <div className="w-full h-5/6">
          <Route path="/" component={Home} exact/>
          <Route path="/new_machine" component={NewMachine} />
          <Route path="/edit" component={Edit} />
        </div>
      </div>
    </Router>
  );
}

export default App;
