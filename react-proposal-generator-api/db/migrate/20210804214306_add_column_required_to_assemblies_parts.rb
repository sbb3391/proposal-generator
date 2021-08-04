class AddColumnRequiredToAssembliesParts < ActiveRecord::Migration[6.1]
  def change
    add_column :parts_assemblies, :required, :boolean
  end
end
