export const editMachine = (machine, proposalId, history, machineType) => {

  history.push(`/proposals/${proposalId}/machines/${machine.machineId}/edit`)
    
  return (dispatch) => {
    dispatch({type: 'ADD_MODEL', modelId: machine.modelId})
    dispatch({type: "START_FETCHING_ASSEMBLIES"});
    fetch(`https://proposals-api.herokuapp.com/models/${machine.modelId}/assemblies`)
    .then(resp => resp.json())
    .then(assemblies => {
      setTimeout(() => dispatch({type: 'ADD_ALL_ASSEMBLIES', assemblies: assemblies, machine: machine, machineStatus: "edit"}),
      1000)
    })
  }
}