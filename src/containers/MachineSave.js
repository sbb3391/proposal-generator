import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCustomersForSelectBox } from '../actions/fetches';

class MachineSave extends Component {

  state = {
    selectValue: "none",
    customers: []
  }

  componentDidMount() {
    let addCustomersToState = (customersArray) => {
      this.setState({
        customers: customersArray.map( customer => {
          return{id: customer.id, name: customer.customer_name}
        })
      })
    }

    fetchCustomersForSelectBox(addCustomersToState)
  }

  handleSelection(event) {

    this.setState({
      selectValue: event.target.value
    })
  }

  closeMachineSave = (event) => {
    if (event.target.id === "machine-save" ) {
      this.props.toggleMachineSave()
    }
  }

  renderCustomers(customers) {
    return customers.map( customer => {
      return <option id={customer.id}>{customer.name}</option>
    })
  }

  submitNewProposalForm = () => {
  }

  render() {
    return (
      <div onClick={this.closeMachineSave} id="machine-save" className="flex w-full h-full relative z-20">
        <div className="w-1/2 h-2/3 mx-auto border-black border-2 place-self-center bg-white py-4">
            <div className="flex flex-col w-full h-full space-y-3">
              <h1 className="w-11/12 mx-auto text-center">Create a Proposal:</h1>
              <div className="flex flex-col space-y-2 w-11/12 mx-auto">
                <label className="text-2xl">Customer Name</label>
                <select className="w-1/2 h-12 mx-auto border border-black rounded-md px-2" value={this.state.selectValue} onChange={(event) => this.handleSelection(event)} readOnly>
                  <option value="none" disabled hidden>
                    Select Customer
                  </option>
                  {this.renderCustomers(this.state.customers)}
                </select>
              </div>
              <div className="flex flex-col space-y-2 w-11/12 mx-auto ">
                <label className="text-2xl">Proposal Name</label>
                <input id="propsal-name" className="h-12 border border-black rounded-md px-2"></input>
              </div>
              <div className="flex content-center items-center">
                <button onClick={this.submitNewProposalForm} className="font-bold text-2xl rounded-md p-2 mx-auto bg-green-500 text-white bold cursor-pointer">Create Proposal and Add Machine</button>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {}
)

const mapDispatchToProps = dispatch => (
  {
    toggleMachineSave: () => dispatch({type: 'TOGGLE_MACHINE_SAVE'})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(MachineSave);