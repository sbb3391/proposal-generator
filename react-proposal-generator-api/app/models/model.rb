class Model < ApplicationRecord
  has_many :model_assemblies 
  has_many :assemblies, through: :model_assemblies

end
