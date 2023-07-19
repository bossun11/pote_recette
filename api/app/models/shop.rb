class Shop < ApplicationRecord
  mount_uploader :photos, PhotoUploader

  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_by_users, through: :bookmarks, source: :user

  validates :name, :formatted_address, :place_id, presence: true
  validates :place_id, uniqueness: true

  # 与えられたplace_idで店舗を検索し、存在しなければ新たに作成。
  def self.find_or_create_by_place(params)
    find_or_create_by(place_id: params[:place_id]) do |shop|
      shop.name = params[:name]
      shop.formatted_address = params[:formatted_address]
      shop.photos = params[:photos]
      shop.website = params[:website]
    end
  end
end
