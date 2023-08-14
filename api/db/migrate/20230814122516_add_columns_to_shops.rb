class AddColumnsToShops < ActiveRecord::Migration[7.0]
  def change
    add_column :shops, :latitude, :float
    add_column :shops, :longitude, :float
    add_column :shops, :rating, :float
    add_column :shops, :user_ratings_total, :integer
  end
end
