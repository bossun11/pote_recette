FactoryBot.define do
  factory :shop do
    name { Faker::Company.name }
    formatted_address { Faker::Address.full_address }
    photos { Faker::LoremFlickr.image }
    place_id { Faker::Alphanumeric.alphanumeric(number: 10) }
    website { Faker::Internet.url }
    latitude { Faker::Address.latitude }
    longitude { Faker::Address.longitude }
    rating { rand(1.0..5.0).round(1) }
    user_ratings_total { rand(1..1000) }
  end
end
