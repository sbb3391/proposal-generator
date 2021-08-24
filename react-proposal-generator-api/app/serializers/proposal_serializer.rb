class ProposalSerializer < SerializerParent
  attributes :id, :customer_name, :machines

  def machines 
    machines = self.object.machines.map do |machine| 
      serialize_machine(machine)
    end

    machines
  end

end
