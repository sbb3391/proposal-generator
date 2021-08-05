import { combineReducers } from 'redux';

function newMachineReducer(state = {
  modelId: ''
}, action) {
  switch (action.type) {
    case 'ADD_MODEL':
      return Object.assign({}, {...state}, {modelId: action.modelId})
    default:
      return {...state}
  }
}

export default newMachineReducer;
