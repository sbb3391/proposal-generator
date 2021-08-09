class AssemblySerializer < ActiveModel::Serializer
  attributes :id, :name, :assembly_type, :required_assembly, :items, :pick_one_group

  def items
    self.object.items.map do |item|
      {
        itemId: item.id,
        itemNumber: item.item_number,
        description: item.description,
        branchFloor: item.branch_floor_price,
        target: item.target_price,
        required: item.items_assemblies[0].required
      }
    end 
  end

  def required_assembly
    self.object.model_assemblies[0].required
  end

  def pick_one_group
    id = ModelAssembly.find_by(model_id: instance_options[:model_id], assembly_id: self.object.id).pick_one_group_id
    if id
      {
        pick_one_group_id: id,
        pick_one_group_description: PickOneGroup.find(id).description,
        pick_one_group_assemblies: PickOneGroup.find(id).model_assemblies
      }
    end

  end
end
