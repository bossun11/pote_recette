class Api::V1::BookmarksController < ApplicationController
  before_action :set_shop, only: [:create, :destroy]

  def index
    bookmarks = current_api_v1_user.bookmarked_shops
    render json: bookmarks
  end

  def create
    current_api_v1_user.bookmark(@shop)
    render json: { status: :created }
  end

  def destroy
    current_api_v1_user.remove_bookmark(@shop)
    render json: { status: :ok }
  end

  private

  def set_shop
    @shop = Shop.find_or_create_by_place(bookmark_params)
  end

  def bookmark_params
    params.require(:shop).permit(:place_id, :name, :formatted_address, :photos, :website, :latitude, :longitude, :rating, :user_ratings_total)
  end
end
