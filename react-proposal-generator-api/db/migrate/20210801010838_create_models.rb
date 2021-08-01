class CreateModels < ActiveRecord::Migration[6.1]
  def change
    create_table :models do |t|
      t.string :part_number
      t.string :name
      t.string :short_description
      t.decimal :branch_floor_price
      t.decimal :srp 
      t.timestamps
    end
  end
end
