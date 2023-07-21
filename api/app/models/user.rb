class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_shops, through: :bookmarks, source: :shop

  validates :name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, uniqueness: { case_sensitive: true }

  def bookmark(shop)
    bookmarked_shops << shop
  end

  def remove_bookmark(shop)
    bookmarked_shops.destroy(shop)
  end
end
