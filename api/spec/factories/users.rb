FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    sequence(:email) { |n| "user-#{n}@gmail.com" }
    password { "password" }
    password_confirmation { "password" }
  end
end
