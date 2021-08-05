class ModelSerializer < ActiveModel::Serializer
  attributes :id, :name, :assemblies

  def assemblies 
    self.object.model_assemblies.map do |ma| 
      {
        id: ma.assembly_id,
        name: Assembly.all.where(id: ma.assembly_id)
      }
    end
  end
end
