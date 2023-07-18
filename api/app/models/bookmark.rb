class Bookmark < ApplicationRecord
  validates :user_id, uniqueness: { scope: :shop_id }
end
