export function fetchAssemblies(modelId) {
  return (dispatch) => {
    dispatch({type: "START_FETCHING_ASSEMBLIES"});
    debugger;
    fetch(`https://proposals-api.herokuapp.com/models/${modelId}/assemblies`)
    .then(resp => resp.json())
    .then(assemblies => {
      setTimeout(() => dispatch({type: 'ADD_ALL_ASSEMBLIES', assemblies: assemblies, machineStatus: "new", machine: {}}),
      1000)
    })
  }
}