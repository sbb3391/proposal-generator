class ModelAssemblySerializer < ActiveModel::Serializer
  attributes :id, :model_id, :assembly_id, :required, :assemblies
  
  def assemblies
    self.object.assemblies.map do |assembly|
      id: assembly.id
      name: assembly.name
    end
  end
end
