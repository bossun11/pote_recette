require 'rails_helper'

RSpec.describe User do
  context "正常系" do
    let!(:user) { create(:user) }

    it "ユーザー登録ができること" do
      expect(user).to be_valid
    end

    it "ユーザー情報を編集できること" do
      user.name = "test"
      user.email = Faker::Internet.email
      user.image = Faker::LoremFlickr.image
      expect(user).to be_valid
    end

    it "ユーザー削除ができること" do
      user.destroy
      expect(user).to be_destroyed
    end
  end

  context "バリデーション" do
    let!(:user) { create(:user) }

    it "名前がなければ登録できないこと" do
      user.name = nil
      expect(user).not_to be_valid
    end

    it "名前が51文字以上であれば登録できないこと" do
      user.name = "a" * 51
      expect(user).not_to be_valid
    end

    it "メールアドレスがなければ登録できないこと" do
      user.email = nil
      expect(user).not_to be_valid
    end

    it "メールアドレスが重複していれば登録できないこと" do
      duplicate_user = build(:user, email: user.email)
      expect(duplicate_user).not_to be_valid
    end

    it "パスワードがなければ登録できないこと" do
      user.password = nil
      expect(user).not_to be_valid
    end

    it "パスワードが8文字未満であれば登録できないこと" do
      user.password = "a" * 7
      expect(user).not_to be_valid
    end

    it "パスワードと確認用パスワードが一致しなければ登録できないこと" do
      user.password_confirmation = "password1"
      expect(user).not_to be_valid
    end
  end

  context "メソッド" do
    let!(:user) { create(:user) }
    let!(:shop) { create(:shop) }

    it "bookmark(shop)が正常に動作すること" do
      expect { user.bookmark(shop) }.to change { user.bookmarked_shops.count }.by(1)
    end

    it "remove_bookmark(shop)が正常に動作すること" do
      create(:bookmark, user_id: user.id, shop_id: shop.id)
      expect { user.remove_bookmark(shop) }.to change { user.bookmarked_shops.count }.by(-1)
    end
  end
end
