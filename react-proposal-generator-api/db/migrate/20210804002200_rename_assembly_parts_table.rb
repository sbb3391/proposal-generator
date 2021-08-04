class RenameAssemblyPartsTable < ActiveRecord::Migration[6.1]
  def change
    rename_table :assemblies_parts, :assembly_parts
  end
end
