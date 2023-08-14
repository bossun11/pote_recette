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
      shop.remote_photos_url = params[:photos]
      shop.website = params[:website]
      shop.latitude = params[:latitude]
      shop.longitude = params[:longitude]
      shop.rating = params[:rating]
      shop.user_ratings_total = params[:user_ratings_total]
    end
  end
end
