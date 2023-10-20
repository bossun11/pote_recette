FactoryBot.define do
  factory :review do
    shop_id { Faker::Alphanumeric.alphanumeric(number: 10) }
    text { "テストレビュー" }
    time { Faker::Alphanumeric.alphanumeric(number: 8) }
    relative_time_description { "1週間前" }
    created_at { Time.zone.now.ago(1.week) }
  end
end
