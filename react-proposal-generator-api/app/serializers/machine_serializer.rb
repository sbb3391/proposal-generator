class MachineSerializer < SerializerParent
  attributes :id, :assemblies

  def assemblies
    serialize_machine(self.object)
  end

end

