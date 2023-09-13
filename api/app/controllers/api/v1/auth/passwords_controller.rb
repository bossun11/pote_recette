class Api::V1::Auth::PasswordsController < Devise::PasswordsController
  private

  def respond_with(resource, _opts = {})
    send_reset_mail_success && return if resource.blank?
    reset_password_success && return if resource.persisted?

    reset_password_failed
  end

  def send_reset_mail_success
    render json: { message: 'パスワード再設定用のメールを送信しました。' }, status: :ok
  end

  def reset_password_success
    render json: { message: 'パスワードを再設定しました。' }, status: :ok
  end

  def reset_password_failed
    render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
  end

  # パスワード再設定用のメールを送信するためのメソッドをオーバーライド
  def resource_params
    params.permit(:email, :redirect_url, :password, :password_confirmation, :reset_password_token)
  end

  # 空のハッシュを返すflashメソッドを定義し、Deviseのデフォルトの行動をオーバーライド
  def flash
    {}
  end
end
