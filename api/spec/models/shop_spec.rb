require 'rails_helper'

RSpec.describe Shop do
  context "正常系" do
    let!(:shop) { create(:shop) }

    it "店舗登録ができること" do
      expect(shop).to be_valid
    end

    it "店舗情報を編集できること" do
      shop.name = "test"
      shop.formatted_address = Faker::Address.full_address
      shop.photos = Faker::LoremFlickr.image
      shop.website = Faker::Internet.url
      shop.latitude = Faker::Address.latitude
      shop.longitude = Faker::Address.longitude
      shop.rating = rand(1.0..5.0).round(1)
      shop.user_ratings_total = rand(1..1000)
      expect(shop).to be_valid
    end

    it "店舗削除ができること" do
      shop.destroy
      expect(shop).to be_destroyed
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

  describe "メソッド" do
    context "self.find_or_create_by_place(params)" do
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

      it "self.find_or_create_by_place(params)で店舗登録できること" do
        expect { described_class.find_or_create_by_place(params) }.to change(described_class, :count).by(1)
      end

      it "self.find_or_create_by_place(params)で店舗登録できないこと" do
        create(:shop, place_id: params[:place_id])
        expect { described_class.find_or_create_by_place(params) }.not_to change(described_class, :count)
      end
    end

    context "self.with_recent_reviews(shops, limit = 5)" do
      it "self.with_recent_reviewsで最新のレビューを5件取得できること" do
        shop = create(:shop)
        new_reviews = create(:review, shop_id: shop.id, created_at: Time.zone.now)
        create_list(:review, 5, shop_id: shop.id)
        described_class.with_recent_reviews([shop])
        expect(shop.reviews.count).to eq 5
        expect(shop.reviews.first).to eq new_reviews
      end
    end
  end

  describe "スコープ" do
    context "self.ranked_by_bookmarks" do
      let!(:shop_high_rating) { create(:shop, rating: 4.0) }
      let!(:shop_medium_rating) { create(:shop, rating: 4.5) }
      let!(:shop_low_rating) { create(:shop, rating: 3.0) }
      let!(:shop_very_high_rating) { create(:shop, rating: 4.7) }

      before do
        create_list(:bookmark, 5, shop: shop_high_rating)
        create_list(:bookmark, 3, shop: shop_medium_rating)
        create_list(:bookmark, 7, shop: shop_low_rating)
        create_list(:bookmark, 4, shop: shop_very_high_rating)
      end

      it "self.ranked_by_bookmarksで評価が3.5未満のショップは結果に含まれないこと" do
        result = described_class.ranked_by_bookmarks
        expect(result).not_to include shop_low_rating
      end

      it "self.ranked_by_bookmarksでブックマーク数の多い順にショップを3件取得できること" do
        result = described_class.ranked_by_bookmarks
        expect(result.first).to eq shop_high_rating
        expect(result.second).to eq shop_very_high_rating
        expect(result.third).to eq shop_medium_rating
      end
    end
  end
end
