class ProposalSerializer < ActiveModel::Serializer
  attributes :id, :customer_name, :machines

  def machines 
  end

end
