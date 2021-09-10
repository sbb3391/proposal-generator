class MachineSerializer < SerializerParent
  attributes :id, :assemblies, :machine

  def assemblies
    serialize_machine_preview_assemblies(self.object)
  end

  def machine
    serialize_machine(self.object)
  end


end

