class Machine < ApplicationRecord
  belongs_to :model
  has_many :parts
  has_many :machine_assembly_items
end
