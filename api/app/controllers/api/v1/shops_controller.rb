class Api::V1::ShopsController < ApplicationController
  require "net/http"
  require "uri"
  require "cgi"

  def search
    query = CGI.escape("芋のお菓子専門店+in+#{params[:location]}")
    uri = URI.parse("https://maps.googleapis.com/maps/api/place/textsearch/json?query=#{query}&key=#{ENV['GOOGLE_MAP_API_KEY']}")
    res = Net::HTTP.get_response(uri)
    render json: res.body
  end
end
