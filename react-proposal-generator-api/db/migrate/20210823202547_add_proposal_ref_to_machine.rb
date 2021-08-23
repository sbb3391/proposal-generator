class AddProposalRefToMachine < ActiveRecord::Migration[6.1]
  def change
    add_reference :machines, :proposal, foreign_key: true
  end
end
