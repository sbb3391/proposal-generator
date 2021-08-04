import Home from './containers/Home.js';
import Navbar from './containers/Navbar';
import About from './components/About';
import Edit from './components/Edit'

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router >
      <div className="App">
        <Navbar />
      </div>
      <Route path="/" component={Home} exact/>
      <Route path="/about" component={About} />
      <Route path="/edit" component={Edit} />
    </Router>
  );
}

export default App;
