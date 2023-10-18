require 'rails_helper'

RSpec.describe User do
  context "正常系" do
    it "ユーザー登録ができること" do
      user = build(:user)
      expect(user).to be_valid
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
  end
end
