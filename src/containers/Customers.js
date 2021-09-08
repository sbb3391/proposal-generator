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
        <div>
          <span>Name: {proposal.name}</span>
          <span>Last Updated: {proposal.lastUpdated}</span>
        </div>
      )
    })
  }

  renderCustomers = () => {
    return this.props.customers.map( customer => {
      if (customer.side === "front") {
        return(
          <div className="w-1/6 h-32 border-2 border-grey-200 rounded-md flex items-center">
            <h1 className="w-full text-center text-2xl">{customer.customer_name}</h1>
          </div>
        ) 
      } else {
        return(
          <div className="w-1/6 h-32 border-2 border-grey-200 rounded-md flex items-center content-center place-items-center">
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
      <div className="w-full flex flex-wrap">
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
    addCustomers: customers => dispatch({type: 'ADD_CUSTOMERS', customers: customers})
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Customers);