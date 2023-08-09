class Api::V1::ProfilesController < ApplicationController

  def update
    user = current_api_v1_user
    if user.update(user_params)
      render json: { status: 200, data: user }
    else
      render json: { status: 500 }
    end
  end

  private

  def user_params
    params.permit(:name, :email, :image)
  end
end
