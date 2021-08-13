class ModelAssemblySerializer < ActiveModel::Serializer
  attributes :id, :model, :assembly

  def model
    {
      modelId: self.object.model.id,
      name: self.object.model.name 
    }
  end

  def assembly
    {
      assembly_id: self.object.assembly.id,
      name: self.object.assembly.name
    }
  end
end
