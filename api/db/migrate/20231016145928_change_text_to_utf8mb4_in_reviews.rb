class ChangeTextToUtf8mb4InReviews < ActiveRecord::Migration[7.0]
  def up
    execute "ALTER TABLE reviews CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin"
    execute "ALTER TABLE reviews MODIFY text TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin"
  end

  def down
    execute "ALTER TABLE reviews CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci"
    execute "ALTER TABLE reviews MODIFY text TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"
  end
end
