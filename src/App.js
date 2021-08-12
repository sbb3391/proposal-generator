import Home from './containers/Home.js';
import Navbar from './containers/Navbar';
import Edit from './components/Edit'
import NewMachine from './containers/NewMachine'
import Machine from './containers/Machine'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router >
      <div className="App w-full h-full">
        <div className="w-full h-18">
          <Navbar />
        </div>
        <div className="w-full h-5/6">
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/new_machine" component={NewMachine} />
            <Route path="/edit" component={Edit} />
            <Route path="/machines/:id" component={Machine} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
