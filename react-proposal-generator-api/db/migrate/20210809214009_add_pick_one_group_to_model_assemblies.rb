class AddPickOneGroupToModelAssemblies < ActiveRecord::Migration[6.1]
  def change
    add_reference :model_assemblies, :pick_one_group, foreign_key: true
  end
end
