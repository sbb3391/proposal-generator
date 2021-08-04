class RenamePartsAssembliesTable < ActiveRecord::Migration[6.1]
  def change
    rename_table :parts_assemblies, :items_assemblies
  end
end
