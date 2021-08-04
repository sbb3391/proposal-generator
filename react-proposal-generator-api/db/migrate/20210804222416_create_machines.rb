class CreateMachines < ActiveRecord::Migration[6.1]
  def change
    create_table :machines do |t|
      t.belongs_to :model 
      t.string :location_address
      t.string :location_city
      t.string :location_state
      t.string :location_zip

      t.timestamps
    end
  end
end
