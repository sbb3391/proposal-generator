export function saveProposalMachine(machine) {
  const body = machine
  return (dispatch) => {
    dispatch({type: "START_UPDATING_MACHINE", machine: machine});
    fetch(`https://proposals-api.herokuapp.com/proposals/${machine.proposalId}/machines/${machine.machineId}`, {
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