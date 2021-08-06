class ItemsAssemblySerializer < ActiveModel::Serializer
  attributes :id, :required, :item

  def item 
    x = {
      description: self.object.item.description,
      itemNumber: self.object.item.item_number
    }
  end
end
