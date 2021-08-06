class RenameTypeColumnInAssemblies < ActiveRecord::Migration[6.1]
  def change
    rename_column :assemblies, :type, :assembly_type
  end
end
