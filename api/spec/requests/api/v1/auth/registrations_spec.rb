require "rails_helper"

RSpec.describe "Api::V1::Auth::Registrations" do
  describe "Post /create" do
    context "パラメータが正常の場合" do
      let(:user_params) { attributes_for(:user) }

      it "ユーザー登録ができること" do
        expect do
          post "/api/v1/auth", params: { registration: user_params }
        end.to change(User, :count).by(1)
      end

      it "新しいユーザーを含むJSONが返却されること" do
        post "/api/v1/auth", params: { registration: user_params }
        parsed_body = response.parsed_body
        expect(parsed_body['data']).to include(
          "name" => user_params[:name],
          "email" => user_params[:email]
        )
        expect(response).to have_http_status(:ok)
      end
    end

    context "パラメータが異常の場合" do
      let(:user_params) { attributes_for(:user, email: nil) }

      it "ユーザー登録ができないこと" do
        expect do
          post "/api/v1/auth", params: { registration: user_params }
        end.not_to change(User, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "エラーメッセージを含むJSONが返却されること" do
        post "/api/v1/auth", params: { registration: user_params }
        parsed_body = response.parsed_body
        expect(parsed_body['errors']).to be_present
        expect(parsed_body['errors']['email']).to include("can't be blank")
        expect(parsed_body['errors']['full_messages']).to include("Email can't be blank")
      end
    end
  end
end
