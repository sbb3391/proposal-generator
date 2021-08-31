export function saveProposalMachine(machine) {
  const body = machine
  return (dispatch) => {
    dispatch({type: "START_UPDATING_MACHINE", machine: machine});
  //   fetch(`http://localhost:3000/proposals/${machine.proposalId}/machines/${machine.machineId}`, {
  //     headers: {
  //       "Content-type": "application/json",
  //       'Content-Type': 'application/json'
  //       },
  //     method: "PUT",
  //     body: JSON.stringify(body)
  //   })
  //   .then(resp => resp.json())
  //   .then(proposal => {
  //     debugger;
  //   })
  }
}