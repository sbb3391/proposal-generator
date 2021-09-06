class MachinePreviewSerializer < SerializerParent
  attributes :id, :assemblies

  def assemblies 
    serialize_machine_preview_assemblies(self.object)
  end
end