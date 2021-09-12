class CreateImages < ActiveRecord::Migration[6.1]
  def change
    create_table :images do |t|

      t.string :base64_image
      t.string :item_ids, array: true, default: []
      t.timestamps
    end
  end
end
