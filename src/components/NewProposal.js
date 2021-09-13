import React, { Component } from 'react';
import {createProposal} from '../actions/createProposal'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

const NewProposal = (props) => {

  const history = useHistory();

  const proposalName = () => {
    return document.querySelector("#proposal-name").value
  } 

  return (
    <div className="w-full h-full flex">
      <div className="w-1/2 mx-auto h-1/2 place-self-center">
        <div className="flex flex-col">
          <h1 className="text-center text-3xl mt-4">Proposal Name:</h1>
          <div className="flex-col mt-4 text-center">
            <input id="proposal-name" className="w-2/3 h-12 mx-auto border border-black rounded-md px-2" />
          </div>
          <div className="text-center mt-4">
            <button onClick={() => props.createProposal(props.match.params.id, proposalName(), history) } className="border border-black rounded-md w-52 mx-auto bg-green-500 text-white bold cursor-pointer">Create Proposal</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => (
  {}
)

const mapDispatchToProps = dispatch => (
  {
    createProposal: (customerId, proposalName, history) => dispatch(createProposal(customerId, proposalName, history))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(NewProposal);