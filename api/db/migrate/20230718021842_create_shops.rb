class CreateShops < ActiveRecord::Migration[7.0]
  def change
    create_table :shops do |t|
      t.string :name, null: false
      t.string :formatted_address, null: false
      t.string :photos
      t.string :place_id, null: false
      t.string :website

      t.timestamps
    end
    add_index :shops, :place_id, unique: true
  end
end
