class AddImageBooleanToItems < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :image, :boolean, default: false
  end
end
