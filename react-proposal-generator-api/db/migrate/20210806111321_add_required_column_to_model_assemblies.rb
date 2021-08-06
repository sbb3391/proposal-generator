class AddRequiredColumnToModelAssemblies < ActiveRecord::Migration[6.1]
  def change
    add_column :model_assemblies, :required, :boolean
  end
end
