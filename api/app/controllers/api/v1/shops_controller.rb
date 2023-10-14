class Api::V1::ShopsController < ApplicationController
  def search
    render json: GoogleMapsService.search_shops_by_location(params[:location])
  end

  def show
    render json: GoogleMapsService.get_shop_details(params[:id])
  end

  def rankings
    shops = Shop.ranked_by_bookmarks
    render json: shops.as_json(include: :reviews)
  end
end
