class CreatePartsAssemblies < ActiveRecord::Migration[6.1]
  def change
    create_table :parts_assemblies do |t|
      t.belongs_to :part 
      t.belongs_to :assembly
      t.timestamps
    end
  end
end
