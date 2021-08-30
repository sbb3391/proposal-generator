class ProposalSerializer < SerializerParent
  attributes :id, :customer_name, :machines

  def machines 
    machines = self.object.machines.map do |machine|
      {
        machineId: machine.id,
        modelId: machine.model_id,
        proposalId: machine.proposal_id,
        assemblies: serialize_machine(machine),
        colorClick: machine.color_click,
        monoClick: machine.mono_click,
        annualColorVolume: machine.annual_color_volume,
        annualMonoVolume: machine.annual_mono_volume,
        serviceComments: machine.service_comments,
        pricingComments: machine.pricing_comments
      }
    end

    machines
  end

end
