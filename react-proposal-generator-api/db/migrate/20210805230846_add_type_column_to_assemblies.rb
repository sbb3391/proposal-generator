class AddTypeColumnToAssemblies < ActiveRecord::Migration[6.1]
  def change
    add_column :assemblies, :type, :string
  end
end
