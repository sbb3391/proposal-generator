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
            <Route path="/machine/new" render={() => <NewMachine type="new" />} />
            <Route path="/machines/preview" exact render={(match) => <Machine {...props} machine={props.previewMachine.machine} changePrice={props.changeItemPrice} 
                                                                        match={match.match} addMachine={props.addMachine} machineType="preview" />} />
            <Route path="/edit" component={Edit} />
            <Route path="/machines/:id" render={(match) => <Machine {...props} machine={props.machine} changePrice={props.changeItemPrice} 
                                                              match={match.match} addMachine={props.addMachine} machineType="machine"/>} />
            <Route exact path="/proposals" component={Proposals}/>
            <Route path="/proposals/:id" component={Proposal} />
            <Route path="/edit" exact render={() => <NewMachine type="edit"/>} />
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
    popWindow: state.popWindow,
    previewMachine: state.previewMachine
  }
)

const mapDispatchToProps = dispatch => (
  {
    addMachine: machine => dispatch({type: 'ADD_MACHINE', machine: machine}),
    changeItemPrice: (item, machineType) => dispatch({type: 'CHANGE_ITEM_PRICE', item: item, machineType: machineType})
    
  }
)


export default connect(mapStateToProps, mapDispatchToProps)(App);
