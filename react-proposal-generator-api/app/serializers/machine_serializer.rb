class MachineSerializer < ActiveModel::Serializer
  attributes :id, :assemblies

  def assemblies
    # returns a list of all ItemsAssemblies
    items_assemblies = self.object.machine_assembly_items.map do |mai|
      ItemsAssembly.find(mai.assembly_item_id)
    end

    assemblies = items_assemblies.map do |ia|
      Assembly.find(ia.assembly_id)
    end

    return_map = assemblies.uniq.map do |assembly| 
      items = assembly.items.map do |item|
        {
          itemId: item.id,
          description: item.description,
          branchFloor: item.branch_floor_price,
          target: item.target_price,
          required: item.items_assemblies[0].required,
          part_type: item.part_type
        }
      end

      {
        id: assembly.id,
        name: assembly.name,
        assembly_type: assembly.assembly_type,
        required_assembly: assembly.model_assemblies[0].required,
        items: items
      }
    end 
  end

end
