export function changePreviewMachineItemPrice(item, state) {
  if (item.unitPrice === "") {
    item.unitPrice = 0
  }

  const assembly = state.previewMachine.machine.assemblies.find( assembly => assembly.id == item.assemblyId && assembly.modelId == item.modelId)
  const assemblyIndex = state.previewMachine.machine.assemblies.indexOf(assembly)
  const findItem = assembly.items.find( i => i.itemId == item.itemId)
  const itemIndex = assembly.items.indexOf(findItem)

  const newAssembly = Object.assign({}, assembly)
  newAssembly.items[itemIndex].unitPrice = parseFloat(item.unitPrice)
  
  const assemblyState = state.previewMachine.machine.assemblies
  const firstHalf = assemblyState.slice(0, assemblyIndex)
  const secondHalf = assemblyState.slice(assemblyIndex + 1)

  return {
    ...state,
    previewMachine: {
      ...state.previewMachine,
      machine: {
        ...state.previewMachine.machine,
        assemblies: [
          ...firstHalf, newAssembly, ...secondHalf
        ]
      }
    }
  }
}

export function changeMachineItemPrice(item, state) {
  if (item.unitPrice === "") {
    item.unitPrice = 0
  }

  const assembly = state.machine.assemblies.find( assembly => assembly.id == item.assemblyId && assembly.modelId == item.modelId)
  const assemblyIndex = state.machine.assemblies.indexOf(assembly)
  const findItem = assembly.items.find( i => i.itemId == item.itemId)
  const itemIndex = assembly.items.indexOf(findItem)

  const newAssembly = Object.assign({}, assembly)
  newAssembly.items[itemIndex].unitPrice = parseFloat(item.unitPrice)
  
  const assemblyState = state.machine.assemblies
  const firstHalf = assemblyState.slice(0, assemblyIndex)
  const secondHalf = assemblyState.slice(assemblyIndex + 1)

  return {
    ...state,
    machine: {
      ...state.machine,
      assemblies: [
        ...firstHalf, newAssembly, ...secondHalf
      ]
    }
  }
}

export function changeProposalItemPrice(item, state) {
  if (item.unitPrice === "") {
    item.unitPrice = 0
  }

  const assembly = state.machinePreview.machine.assemblies.find( assembly => assembly.id == item.assemblyId && assembly.modelId == item.modelId)
  const assemblyIndex = state.machinePreview.machine.assemblies.indexOf(assembly)
  const findItem = assembly.items.find( i => i.itemId == item.itemId)
  const itemIndex = assembly.items.indexOf(findItem)

  const newAssembly = Object.assign({}, assembly)
  newAssembly.items[itemIndex].unitPrice = parseFloat(item.unitPrice)
  
  const assemblyState = state.machinePreview.machine.assemblies
  const firstHalf = assemblyState.slice(0, assemblyIndex)
  const secondHalf = assemblyState.slice(assemblyIndex + 1)

  debugger;
  return {
    ...state,
    machinePreview: {
      ...state.machinePreview,
      machine: {
        ...state.machinePreview.machine,
        assemblies: [
          ...firstHalf, newAssembly, ...secondHalf
        ]
      }
    }
  }
}