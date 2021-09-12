class AddImageRefToMachines < ActiveRecord::Migration[6.1]
  def change
    add_reference :machines, :image, foreign_key: true
  end
end
