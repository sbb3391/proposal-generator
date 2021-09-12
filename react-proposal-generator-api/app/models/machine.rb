class Machine < ApplicationRecord
  belongs_to :customer
  belongs_to :proposal
  belongs_to :model
  belongs_to :image, optional: true
  has_one_attached :machine_image
  has_many :parts
  has_many :machine_assembly_items
end
