require 'rails_helper'

RSpec.describe Review do
  context "正常系" do
    let!(:shop) { create(:shop) }
    let!(:review) { create(:review, shop_id: shop.id) }

    it "レビュー登録ができること" do
      expect(review).to be_valid
    end

    it "レビュー情報を編集できること" do
      review.text = "編集後のレビュー"
      review.time = Faker::Alphanumeric.alphanumeric(number: 8)
      review.relative_time_description = "1ヶ月前"
      expect(review).to be_valid
    end
  end

  context "バリデーション" do
    let!(:review) { build(:review) }

    it "店舗IDがなければ登録できないこと" do
      review.shop_id = nil
      expect(review).not_to be_valid
    end
  end
end
