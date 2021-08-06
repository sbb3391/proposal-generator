class ItemsAssemblySerializer < ActiveModel::Serializer
  attributes :id, :assemblyName, :required, :item

  def item 
    x = {
      description: self.object.item.description,
      itemNumber: self.object.item.item_number
    }
  end

  def assemblyName
    self.object.assembly.name
  end
end
