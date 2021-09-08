class AddCustomerRefToMachine < ActiveRecord::Migration[6.1]
  def change
    add_reference :machines, :customer, foreign_key: true
  end
end
