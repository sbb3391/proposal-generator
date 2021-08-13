class CreateMachineAssemblyItems < ActiveRecord::Migration[6.1]
  def change
    create_table :machine_assembly_items do |t|
      t.belongs_to :machine
      t.belongs_to :assembly_item
      t.decimal :unit_price
      t.timestamps
    end
  end
end
