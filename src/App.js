import Home from './containers/Home.js';
import { DragDropContext } from 'react-beautiful-dnd';
import Navbar from './containers/Navbar';
import Edit from './components/Edit'
import NewMachine from './containers/NewMachine'
import Machine from './containers/Machine'
import Proposals from './containers/Proposals'
import Proposal from './containers/Proposal'
import { connect } from 'react-redux';
import PopWindow from './containers/PopWindow'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App(props) {

  const renderPopWindow = () => {
    return props.popWindow ? <PopWindow /> : null
  }

  return (
    <Router >
      <div className="App absolute z-0 w-full h-full">
        <div className="w-full h-18">
          <Navbar />
        </div>
        <div className="w-full h-5/6">
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/machine/new" component={NewMachine} />
            <Route path="/edit" component={Edit} />
            <Route path="/machines/:id" render={(match) => <Machine {...props} machine={props.machine} changePrice={props.changeMachineItemPrice} match={match.match} addMachine={props.addMachine}/>} />
            <Route path="/proposals" exact component={Proposals}/>
            <Route path="/proposals/:id" component={Proposal} />
          </Switch>
        </div>
      </div>
      {renderPopWindow()}
    </Router>
  );
}

const mapStateToProps = state => (
  {
    machine: state.machine,
    popWindow: state.popWindow
  }
)

const mapDispatchToProps = dispatch => (
  {
    addMachine: machine => dispatch({type: 'ADD_MACHINE', machine: machine}),
    changeMachineItemPrice: item => dispatch({type: 'CHANGE_MACHINE_ITEM_PRICE', item: item})
    
  }
)


export default connect(mapStateToProps, mapDispatchToProps)(App);
