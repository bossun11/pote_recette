require 'rails_helper'

RSpec.describe Shop do
  context "正常系" do
    it "店舗登録ができること" do
      shop = build(:shop)
      expect(shop).to be_valid
    end
  end

  context "バリデーション" do
    let!(:shop) { create(:shop) }

    it "店舗名がなければ登録できないこと" do
      shop.name = nil
      expect(shop).not_to be_valid
    end

    it "住所がなければ登録できないこと" do
      shop.formatted_address = nil
      expect(shop).not_to be_valid
    end

    it "place_idがなければ登録できないこと" do
      shop.place_id = nil
      expect(shop).not_to be_valid
    end

    it "place_idが重複していれば登録できないこと" do
      duplicate_shop = build(:shop, place_id: shop.place_id)
      expect(duplicate_shop).not_to be_valid
    end
  end

  context "メソッド" do
    let!(:params) do
      {
        name: Faker::Company.name,
        formatted_address: Faker::Address.full_address,
        photos: Faker::LoremFlickr.image,
        place_id: Faker::Alphanumeric.alphanumeric(number: 10),
        website: Faker::Internet.url,
        latitude: Faker::Address.latitude,
        longitude: Faker::Address.longitude,
        rating: 4.5,
        user_ratings_total: 150,
        reviews: [
          {
            text: "テストレビュー1",
            time: Time.zone.now,
            relative_time_description: "1ヶ月前"
          }
        ]
      }
    end

    it "新しい店舗を作成すること" do
      expect { described_class.find_or_create_by_place(params) }.to change(described_class, :count).by(1)
    end

    it "新しい店舗を作成しないこと" do
      create(:shop, place_id: params[:place_id])
      expect { described_class.find_or_create_by_place(params) }.not_to change(described_class, :count)
    end
  end
end
