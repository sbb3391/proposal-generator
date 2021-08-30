class AddColumnsToMachine < ActiveRecord::Migration[6.1]
  def change
    add_column :machines, :color_click, :decimal
    add_column :machines, :mono_click, :decimal
    add_column :machines, :service_comments, :string
    add_column :machines, :pricing_comments, :string
    add_column :machines, :annual_color_volume, :integer
    add_column :machines, :annual_mono_volume, :integer
  end
end
