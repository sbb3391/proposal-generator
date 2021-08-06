class ItemSerializer < ActiveModel::Serializer
  attributes :id, :item_number, :description, :required

  def required 
    self.object. do |item| 
  end
end