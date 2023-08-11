class Api::V1::ProfilesController < ApplicationController
  before_action :authenticate_api_v1_user!

  def update
    user = current_api_v1_user
    if user.update(user_params)
      render json: { status: 200, data: user }
    else
      render json: { status: 500, errors: user.errors.full_messages }
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :image)
  end
end
