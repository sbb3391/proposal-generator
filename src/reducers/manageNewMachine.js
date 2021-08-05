import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  newMachine: newMachineReducer
})

function newMachineReducer(state = {
  model: ''
}, action) {
  debugger;
  switch (action.type) {
    case 'ADD_MODEL':
      return Object.assign({}, ...state, {action})
  }
}

export default rootReducer;
