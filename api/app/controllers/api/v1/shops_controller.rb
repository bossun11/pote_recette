class Api::V1::ShopsController < ApplicationController
  require "net/http"
  require "uri"
  require "cgi"

  def search
    if params[:location] =~ /^\d+\.\d+,\d+\.\d+$/ # 緯度経度の形式かどうかチェック
      # 緯度経度が与えられた場合
      query = CGI.escape("さつまいも菓子専門店")
    else
      # 地名や店名が与えられた場合
      query = CGI.escape("さつまいも菓子専門店+in+#{params[:location]}")
    end

    radius = params[:radius] || 10000
    uri = URI.parse("#{ENV['GOOGLE_MAP_PLACE_URL']}/textsearch/json?query=#{query}&key=#{ENV['GOOGLE_MAP_API_KEY']}&language=ja&radius=#{radius}")
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
