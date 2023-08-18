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
    fields = Shop::GOOGLE_MAP_FIELDS
    uri = URI.parse("#{ENV['GOOGLE_MAP_PLACE_URL']}/details/json?place_id=#{plase_id}&fields=#{fields}&key=#{ENV['GOOGLE_MAP_API_KEY']}&language=ja")
    res = Net::HTTP.get_response(uri)
    render json: res.body
  end
end
