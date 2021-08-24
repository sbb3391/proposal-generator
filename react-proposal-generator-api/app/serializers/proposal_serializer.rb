class ProposalSerializer < SerializerParent
  attributes :id, :customer_name, :machines

  def machines 
    machines = self.object.machines.map do |machine|
      {
        machineId: machine.id,
        modelId: machine.model_id,
        proposalId: machine.proposal_id,
        assemblies: serialize_machine(machine)
      }
    end

    machines
  end

end
