function fetchUrl() {
 if (process.env.NODE_ENV === "development") {
   return "http://localhost:3000"
 } else {
   return "https://proposals-api.herokuapp.com"
 }
}

export function createProposal(customerId, proposalName, history) {
  const body = {
    proposal_name: proposalName
  }

  return (dispatch) => {
    fetch(`${fetchUrl()}/customers/${customerId}/proposals`, {
      headers: {
        "Content-type": "application/json",
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(proposal => {
      history.push(`/proposals/${proposal.id}/machine/new`)
      dispatch({type: "ADD_PROPOSAL", proposal: proposal})
    })
  }
}

export const editMachine = (machine, proposalId, history, machineType) => {

  history.push(`/proposals/${proposalId}/machines/${machine.machineId}/edit`)
    
  return (dispatch) => {
    dispatch({type: 'ADD_MODEL', modelId: machine.modelId})
    dispatch({type: "START_FETCHING_ASSEMBLIES"});
    fetch(`${fetchUrl()}/models/${machine.modelId}/assemblies`)
    .then(resp => resp.json())
    .then(assemblies => {
      setTimeout(() => dispatch({type: 'ADD_ALL_ASSEMBLIES', assemblies: assemblies, machine: machine, machineStatus: "edit"}),
      1000)
    })
  }
}

export function fetchAssemblies(modelId) {
  return (dispatch) => {
    dispatch({type: "START_FETCHING_ASSEMBLIES"});
    fetch(`${fetchUrl()}/models/${modelId}/assemblies`)
    .then(resp => resp.json())
    .then(assemblies => {
      setTimeout(() => dispatch({type: 'ADD_ALL_ASSEMBLIES', assemblies: assemblies, machineStatus: "new", machine: {}}),
      1000)
    })
  }
}

export function fetchProposal(proposalId) {
  return (dispatch) => {
    dispatch({type: "START_FETCHING_ASSEMBLIES"});
    fetch(`${fetchUrl()}/proposals/${proposalId}`)
    .then(resp => resp.json())
    .then(proposal => {
      dispatch({type: 'ADD_PROPOSAL', proposal: proposal})
    })
  }
}

export function savePreviewMachine(machine) {
  const body = machine
  return (dispatch) => {
    dispatch({type: "START_UPDATING_MACHINE", machine: machine});
    fetch(`${fetchUrl()}/proposals/${machine.proposalId}/machines/${machine.machineId}`, {
      headers: {
        "Content-type": "application/json",
        'Content-Type': 'application/json'
        },
      method: "PUT",
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(machine => {
      dispatch({type: "UPDATE_PROPOSAL_MACHINE", machine: machine})
    })
  }
}

export function saveProposalMachine(machine) {
  const body = machine
  return (dispatch) => {
    dispatch({type: "START_UPDATING_MACHINE", machine: machine});
    fetch(`${fetchUrl()}/proposals/${machine.proposalId}/machines/${machine.machineId}`, {
      headers: {
        "Content-type": "application/json",
        'Content-Type': 'application/json'
        },
      method: "PUT",
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(machine => {
      dispatch({type: "UPDATE_PROPOSAL_MACHINE", machine: machine})
    })
  }
}

export const createMachine = (props, history) => {
  const data = {
    model: {
      id: props.machineAssemblies[0].model_id,
      proposal_name: props.proposalName,
      customer_id: props.customerId,
      assemblies: props.machineAssemblies
    }
  }

  fetch(`${fetchUrl()}/${props.fetchUrl}`, {
  method: props.fetchAction,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(resp => resp.json())
  .then(json => {
    props.dispatch(json)
    if (props.newUrl === "proposals") {
      props.toggleMachineSave()
      history.push(`/proposals/${json.machine.proposalId}`)
    }
    else {
      history.push(`${props.newUrl}`)
    }
  })
}

export const fetchPartsForAssembly= (assemblyId, changeStateFunction) => {
  fetch(`${fetchUrl()}/assemblies/${assemblyId}/items_assemblies`)
  .then(resp => resp.json())
  .then(json => {
    changeStateFunction(json)
  })
}

export const fetchModels = (changeStateFunction, resetMachineFunction) => {
  fetch(`${fetchUrl()}/models`)
    .then( resp => resp.json())
    .then( json => {
      changeStateFunction(json)
      resetMachineFunction()
    })
}

export const fetchCustomers = (addCustomers) => {
  fetch(`${fetchUrl()}/customers`)
  .then(resp => resp.json())
  .then(json => {
    // default each customer to show front
    json.forEach( customer => {
      customer.side = "front"
    })
  
    addCustomers(json)
    
  })
}

export const fetchMachine = (machineId, addMachine) => {
  fetch(`${fetchUrl()}/machines/${machineId}`)
  .then(resp => resp.json())
  .then( json => {
    addMachine(json)
  })
}

export const fetchCustomersForSelectBox = (addCustomersToState) => {
  fetch(`${fetchUrl()}/customers`)
  .then(resp => resp.json())
  .then(json => {
    addCustomersToState(json)
  })
}

export const addImageToDatabase = (body) => {
  fetch(`${fetchUrl()}/images`, {
    headers: {
      "Content-type": "application/json",
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
  .then(proposal => {
    alert("finished")
  })
}

export const deleteMachine = (machineId) => {
  return fetch(`${fetchUrl()}/machines/${machineId}`, {
    headers: {
      "Content-type": "application/json",
      'Content-Type': 'application/json'
    },
    method: "Delete"
  })
}

export const deleteProposal = (proposalId) => {
  return fetch(`${fetchUrl()}/proposals/${proposalId}`, {
    headers: {
      "Content-type": "application/json",
      'Content-Type': 'application/json'
    },
    method: "Delete"
  })
}