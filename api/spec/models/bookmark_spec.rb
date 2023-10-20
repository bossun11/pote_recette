require 'rails_helper'

RSpec.describe Bookmark do
  context "正常系" do
    let!(:bookmark) { create(:bookmark) }

    it "ブックマーク登録ができること" do
      expect(bookmark).to be_valid
    end

    it "ブックマーク削除ができること" do
      bookmark.destroy
      expect(bookmark).to be_destroyed
    end
  end

  context "バリデーション" do
    let!(:bookmark) { create(:bookmark) }

    it "user_idとshop_idの組み合わせが重複している場合は登録できないこと" do
      duplicate_bookmark = build(:bookmark, user_id: bookmark.user_id, shop_id: bookmark.shop_id)
      expect(duplicate_bookmark).not_to be_valid
    end

    it "user_idがなければ登録できないこと" do
      bookmark.user_id = nil
      expect(bookmark).not_to be_valid
    end

    it "shop_idがなければ登録できないこと" do
      bookmark.shop_id = nil
      expect(bookmark).not_to be_valid
    end
  end
end
