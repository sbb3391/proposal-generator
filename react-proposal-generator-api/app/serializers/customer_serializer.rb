class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :customer_name, :proposals

  def proposals
    self.object.proposals.map do |proposal| 
      {
        name: proposal.name,
        lastUpdated: proposal.updated_at,
        created: proposal.created_at
      }
    end
  end
  
end
