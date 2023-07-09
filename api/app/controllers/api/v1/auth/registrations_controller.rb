class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  def create
    super do |resource|
      if resource.persisted?
        sign_in(resource)
      end
    end
  end

  private

  def sign_up_params
    params.require(:registration).permit(:name, :email, :password, :password_confirmation)
  end
end
