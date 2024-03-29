class Shop < ApplicationRecord
  mount_uploader :photos, PhotoUploader

  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_by_users, through: :bookmarks, source: :user
  has_many :reviews, dependent: :destroy

  validates :name, :formatted_address, :place_id, presence: true
  validates :place_id, uniqueness: true

  # Google Places APIの検索結果から必要な情報を取得するための定数
  GOOGLE_MAP_FIELDS = "formatted_address,name,geometry,photos,current_opening_hours,website,place_id,reviews,rating,user_ratings_total".freeze

  # ブックマーク数の多い順にショップを3件取得
  scope :ranked_by_bookmarks, lambda {
    joins(:bookmarks)
      .where('shops.rating >= ?', 3.5)
      .group(:id)
      .order('count(bookmarks.id) desc')
      .limit(3)
  }

  def self.with_recent_reviews(shops, limit = 5)
    shops.each do |shop|
      shop.reviews = shop.reviews.order(created_at: :desc).limit(limit)
    end
  end

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
      params[:reviews]&.each do |review|
        shop.reviews.build(text: review[:text], time: review[:time], relative_time_description: review[:relative_time_description])
      end
    end
  end
end
