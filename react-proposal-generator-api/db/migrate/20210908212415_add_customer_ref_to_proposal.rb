class AddCustomerRefToProposal < ActiveRecord::Migration[6.1]
  def change
    add_reference :proposals, :customer, foreign_key: true
  end
end
