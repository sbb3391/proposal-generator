class RenamePartIdColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :parts_assemblies, :part_id, :item_id
  end
end
