class CreatePickOneGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :pick_one_groups do |t|
      t.belongs_to :model
      t.string :description
      t.timestamps
    end
  end
end
