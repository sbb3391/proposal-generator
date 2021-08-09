class AssemblySerializer < ActiveModel::Serializer
  attributes :id, :name, :assembly_type, :required_assembly, :items

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
end
