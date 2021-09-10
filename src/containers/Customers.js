import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";

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
    return customer.proposals.map( proposal => {
      const date = new Date(`${proposal.lastUpdated}`)
      const options = {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
      }
      debugger;
      return(
      
        <tr className={this.returnRowClass(customer.proposals, proposal)}>
            <NavLink className="cursor-pointer" to={`/proposals/${proposal.id}`}>
              <td className="cursor-pointer hover:underline text-xs w-1/2" >{proposal.name}</td>
            </NavLink>
            <td className="text-xs w-1/2">{date.toLocaleString("en-us", options)}</td>
        </tr>
        )
    })
  }

  returnRowClass = (array, arrayElement) => {
    return array.indexOf(arrayElement) % 2 === 0 ? "bg-blue-200" : null
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
          <div className="w-1/6 h-48 overflow-auto border-2 border-grey-200 rounded-md">
            <div className="w-full">
              <table>
                <thead>
                  <tr>
                    <td className="text-xs">Proposal Name</td>
                    <td className="text-xs">Last Updated</td>
                  </tr>      
                </thead>
                <tbody>
                  {this.renderCustomerProposals(customer)}
                </tbody>
              </table>
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