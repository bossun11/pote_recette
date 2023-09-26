class GoogleMapsService
  require "net/http"
  require "uri"

  BASE_URL = ENV['GOOGLE_MAP_PLACE_URL']
  API_KEY = ENV['GOOGLE_MAP_API_KEY']
  LANGUAGE = 'ja'.freeze

  def self.search_shops_by_location(location)
    query = CGI.escape("さつまいも菓子専門店+in+#{location}")
    uri = URI.parse("#{BASE_URL}/textsearch/json?query=#{query}&key=#{API_KEY}&language=#{LANGUAGE}")
    res = Net::HTTP.get_response(uri)
    res.body
  end

  def self.get_shop_details(place_id)
    fields = Shop::GOOGLE_MAP_FIELDS
    uri = URI.parse("#{BASE_URL}/details/json?place_id=#{place_id}&fields=#{fields}&key=#{API_KEY}&language=#{LANGUAGE}")
    res = Net::HTTP.get_response(uri)
    res.body
  end
end
