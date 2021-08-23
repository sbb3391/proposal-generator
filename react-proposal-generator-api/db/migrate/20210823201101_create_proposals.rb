class CreateProposals < ActiveRecord::Migration[6.1]
  def change
    create_table :proposals do |t|
      t.string :customer_name
      t.string :name
      t.timestamps
    end
  end
end
