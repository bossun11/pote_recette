class Shop < ApplicationRecord
  mount_uploader :photos, PhotoUploader

  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_by_users, through: :bookmarks, source: :user

  validates :name, :formatted_address, :place_id, presence: true
  validates :place_id, uniqueness: true

  # Google Places APIの検索結果から必要な情報を取得するための定数
  GOOGLE_MAP_FIELDS = "formatted_address,name,geometry,photos,current_opening_hours,website,place_id,reviews,rating,user_ratings_total".freeze

  # 検索時のデフォルトの範囲（半径）をメートル単位で定義
  DEFAULT_RADIUS = 10000

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

  # 緯度経度または地名・店名を基にGoogle Places APIの検索クエリを生成
  def self.generate_search_query(location)
    if location =~ /^\d+\.\d+,\d+\.\d+$/
      CGI.escape("さつまいも菓子専門店")
    else
      CGI.escape("さつまいも菓子専門店+in+#{location}")
    end
  end
end
