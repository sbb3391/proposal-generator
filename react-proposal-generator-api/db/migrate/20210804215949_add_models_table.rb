class AddModelsTable < ActiveRecord::Migration[6.1]
  def change
    create_table :models do |t|
      t.string :name
      t.string :short_description 
      t.timestamps
    end
  end
end
