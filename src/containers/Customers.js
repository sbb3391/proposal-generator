import React, { Component } from 'react';
import { connect } from 'react-redux';

class Customers extends Component {

  componentDidMount() {
    fetch('http://localhost:3000/customers')
    .then(resp => resp.json())
    .then(json => {
      // default each customer to show front
      json.forEach( customer => {
        customer.side = "front"
      })

      this.props.addCustomers(json)
      
    })
  }

  renderCustomerProposals = (customer) => {
    debugger;
    return customer.proposals.map( proposal => {
      return(
        <div className="flex flex-col">
          <span className="underline cursor-pointer text-sm" onClick={() => this.props.flipCustomerCard(customer.id)}>{proposal.name}</span>
          <span className="text-sm">Last Updated: {proposal.lastUpdated}</span>
        </div>
      )
    })
  }

  renderCustomers = () => {
    return this.props.customers.map( customer => {
      if (customer.side === "front") {
        return(
          <div className="w-1/6 h-48 border-2 border-grey-200 rounded-md flex items-center">
            <h1 onClick={() => this.props.flipCustomerCard(customer.id)} className="w-full text-center text-2xl hover:underline cursor-pointer">{customer.customer_name}</h1>
          </div>
        ) 
      } else {
        return(
          <div className="w-1/6 h-48 overflow-auto border-2 border-grey-200 rounded-md flex items-center content-center place-items-center">
            <div className="flex flex-col w-full space-y-2">
              {this.renderCustomerProposals(customer)}
            </div>   
          </div>
        )
      }
    })
  }

  render() {
    return (
      <div className="w-11/12 mx-auto flex flex-wrap space-x-6 space-y-4 py-8">
        {this.renderCustomers()}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    customers: state.customers
  }
)

const mapDispatchToProps = dispatch => (
  {
    addCustomers: customers => dispatch({type: 'ADD_CUSTOMERS', customers: customers}),
    flipCustomerCard: customerId => dispatch({type: "FLIP_CUSTOMER_CARD", customerId: customerId})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Customers);