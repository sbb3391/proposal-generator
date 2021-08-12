import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { useHistory } from 'react-router-dom'

function CompleteButton(props) {
  const history = useHistory()

  const createMachine = () => {
    data = "apple"

    fetch('http://localhost:3001/machines/create', {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(json => {

    })
  }
  debugger;
  return (
    <>
      <span className="text-4xl">&#x2192;</span>
      <button id="complete-button" className="static-button" onClick={() => history.push('/machines/create')}>Complete</button>
    </>
  );
}

export default CompleteButton;
