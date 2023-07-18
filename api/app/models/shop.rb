class Shop < ApplicationRecord
  validates :name, :formatted_address, :place_id, presence: true
  validates :place_id, uniqueness: true
end
