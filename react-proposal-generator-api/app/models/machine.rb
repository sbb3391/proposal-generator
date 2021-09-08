class Machine < ApplicationRecord
  belongs_to :customer
  belongs_to :proposal
  belongs_to :model
  has_many :parts
  has_many :machine_assembly_items
end
