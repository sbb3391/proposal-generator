class CreateParts < ActiveRecord::Migration[6.1]
  def change
    create_table :parts do |t|
      t.belongs_to :machine 
      t.belongs_to :item
      t.integer :quantity
      t.decimal :price

      t.timestamps
    end
  end
end
