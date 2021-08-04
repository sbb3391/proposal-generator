class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :item_number
      t.string :description
      t.decimal :branch_floor_price
      t.decimal :target_price
      t.timestamps
    end
  end
end
