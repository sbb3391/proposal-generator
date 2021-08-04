class CreateModelAssemblies < ActiveRecord::Migration[6.1]
  def change
    create_table :model_assemblies do |t|
      t.belongs_to :model 
      t.belongs_to :assembly
      t.timestamps
    end
  end
end
