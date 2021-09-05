class ItemsAssemblySerializer < ActiveModel::Serializer
  attributes :id, :assemblyName, :required, :item, :assembly_id

  def item 
    x = {
      description: self.object.item.description,
      itemNumber: self.object.item.item_number,
      id: self.object.item.id
    }
  end

  def assemblyName
    self.object.assembly.name
  end
end
