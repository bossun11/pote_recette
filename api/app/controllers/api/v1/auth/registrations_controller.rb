class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  def sign_up_params
    papams.permit(:name, :email, :password, :password_confirmation)
  end
end
