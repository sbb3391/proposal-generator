class PickOneGroup < ApplicationRecord
  has_many :model_assemblies
  belongs_to :model
end
