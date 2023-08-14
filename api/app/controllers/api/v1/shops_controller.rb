class Api::V1::ShopsController < ApplicationController
  require "net/http"
  require "uri"
  require "cgi"

  def search
    query = CGI.escape("さつまいも菓子専門店+in+#{params[:location]}")
    uri = URI.parse("#{ENV['GOOGLE_MAP_PLACE_URL']}/textsearch/json?query=#{query}&key=#{ENV['GOOGLE_MAP_API_KEY']}&language=ja")
    res = Net::HTTP.get_response(uri)
    render json: res.body
  end

  def show
    plase_id = params[:id]
    fields = "formatted_address,name,geometry,photos,current_opening_hours,website,place_id,reviews,rating,user_ratings_total"
    uri = URI.parse("#{ENV['GOOGLE_MAP_PLACE_URL']}/details/json?place_id=#{plase_id}&fields=#{fields}&key=#{ENV['GOOGLE_MAP_API_KEY']}&language=ja")
    res = Net::HTTP.get_response(uri)
    render json: res.body
  end
end
