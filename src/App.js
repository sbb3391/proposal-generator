import Home from './containers/Home.js';
import { DragDropContext } from 'react-beautiful-dnd';
import Navbar from './containers/Navbar';
import Edit from './components/Edit'
import NewMachine from './containers/NewMachine'
import Machine from './containers/Machine'
import Proposals from './containers/Proposals'
import Proposal from './containers/Proposal'
import Customers from  './containers/Customers'
import { connect } from 'react-redux';
import PopWindow from './containers/PopWindow'
import { savePreviewMachine } from './actions/fetches';
import MachineSave from './containers/MachineSave.js';
import NewProposal from './components/NewProposal.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App(props) {

  const renderPopWindow = () => {
    return props.popWindow ? <PopWindow /> : null
  }

  const renderMachineSave = () => {
    return props.machineSave ? <MachineSave /> : null
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
            <Route exact path="/machines/preview/edit" render={() => <NewMachine type="preview" />} />
            <Route path="/machines/preview" exact render={(match) => <Machine {...props} machine={props.previewMachine} changePrice={props.changeItemPrice} 
                                                                        match={match.match} addMachine={props.addMachine} machineType="preview" saveMachine={props.savePreviewMachine} />} />

            <Route path="/proposals/:proposalId/machines/:machineId/edit" render={(match) => <NewMachine type="edit" match={match.match}/>} />
            <Route path="/machines/:id" render={(match) => <Machine {...props} machine={props.machine} changePrice={props.changeItemPrice} 
                                                              match={match.match} addMachine={props.addMachine} machineType="machine" /> } />
            <Route exact path="/customers" component={Customers} />  
            <Route path="/customers/:id/proposals/new" render={(match) => <NewProposal match={match.match} />} />                                         
            <Route exact path="/proposals" component={Proposals}/>
            <Route path="/proposals/:proposalId/machine/new" render={(match) => <NewMachine type="new" match={match.match} /> } />
            <Route path="/proposals/:id" component={Proposal} />
            <Route path="/edit" component={Edit}/>
          </Switch>
        </div>
      </div>
      {renderPopWindow()}
      {renderMachineSave()}
    </Router>
  );
}

const mapStateToProps = state => (
  {
    machine: state.machine,
    popWindow: state.popWindow,
    previewMachine: state.previewMachine,
    machineSave: state.machineSave
  }
)

const mapDispatchToProps = dispatch => (
  {
    addMachine: machine => dispatch({type: 'ADD_MACHINE', machine: machine}),
    changeItemPrice: (item, machineType) => dispatch({type: 'CHANGE_ITEM_PRICE', item: item, machineType: machineType}),
    savePreviewMachine: machine => dispatch(savePreviewMachine(machine))
    
  }
)


export default connect(mapStateToProps, mapDispatchToProps)(App);
