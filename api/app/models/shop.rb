class Shop < ApplicationRecord
  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_by_users, through: :bookmarks, source: :user

  validates :name, :formatted_address, :place_id, presence: true
  validates :place_id, uniqueness: true
end
