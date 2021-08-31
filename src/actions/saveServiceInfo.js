export function saveServiceInfo() {
  const body = machines
  return (dispatch) => {
    dispatch({type: "START_SAVE_SERVICE_INFO"});
    fetch(`http://localhost:3000/proposals/${machine.proposalId}/machines/${machine.machineId}`, {
      headers: {
        "Content-type": "application/json",
        'Content-Type': 'application/json'
        },
      method: "PUT",
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(proposal => {
      debugger;
    })
  }
}