class SerializerParent < ActiveModel::Serializer
  def serialize_machine_assemblies(machine)

    items_assemblies = machine.machine_assembly_items.map do |mai|
      ItemsAssembly.find(mai.assembly_item_id)
    end

    assemblies = items_assemblies.map do |ia|
      Assembly.find(ia.assembly_id)
    end

    assemblies_map = assemblies.uniq.map do |assembly| 
      items = assembly.items.map do |item|
        assembly_item_id = ItemsAssembly.find_by(item_id: item.id, assembly_id: assembly.id)
        {
          machineId: machine.id,
          modelId: machine.model_id,
          assemblyId: assembly.id,
          itemId: item.id,
          description: item.description,
          unitPrice: MachineAssemblyItem.find_by(machine_id: machine.id, assembly_item_id: assembly_item_id).unit_price,
          branchFloor: item.branch_floor_price,
          target: item.target_price,
          required: item.items_assemblies[0].required,
          part_type: item.part_type
        }
      end

      {
        modelId: machine.model_id,
        id: assembly.id,
        name: assembly.name,
        assembly_type: assembly.assembly_type,
        required_assembly: assembly.model_assemblies[0].required,
        items: items
      }
    end 

    assemblies_map

  end

  def serialize_machine(machine)
    {
      machineId: machine.id,
      modelId: machine.model_id,
      proposalId: machine.proposal_id,
      assemblies: serialize_machine_assemblies(machine),
      colorClick: machine.color_click,
      monoClick: machine.mono_click,
      annualColorVolume: machine.annual_color_volume,
      annualMonoVolume: machine.annual_mono_volume,
      serviceComments: machine.service_comments,
      pricingComments: machine.pricing_comments
    }
  end

end
