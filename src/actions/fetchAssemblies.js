export function fetchAssemblies(modelId) {
  return (dispatch) => {
    dispatch({type: "START_FETCHING_ASSEMBLIES"});
    fetch(`http://localhost:3000/models/${modelId}/assemblies`)
    .then(resp => resp.json())
    .then(assemblies => dispatch({type: 'ADD_ALL_ASSEMBLIES', assemblies: assemblies}))
  }
}