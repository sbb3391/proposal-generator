class ItemSerializer < ActiveModel::Serializer
  attributes :id, :item_number, :description
end
