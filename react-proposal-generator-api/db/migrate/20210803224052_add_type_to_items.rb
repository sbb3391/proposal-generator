class AddTypeToItems < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :part_type, :string
  end
end
