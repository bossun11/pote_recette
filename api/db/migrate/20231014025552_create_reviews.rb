class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :shop, null: false, foreign_key: true
      t.text :content
      t.integer :time
      t.string :relative_time_description

      t.timestamps
    end
  end
end
