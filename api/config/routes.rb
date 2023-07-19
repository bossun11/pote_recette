Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
      }
      namespace :auth do
        resources :sessions, only: %i[index]
      end

      resources :shops, only: %i[show] do
        collection do
          get :search
        end
      end

      resources :bookmarks, only: %i[index create destroy]
    end
  end
end
