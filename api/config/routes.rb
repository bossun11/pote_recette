Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?

  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        passwords: 'api/v1/auth/passwords',
      }
      namespace :auth do
        resources :sessions, only: %i[index]
      end

      resources :shops, only: %i[show] do
        collection do
          get :search
          get :rankings
        end
      end

      resources :bookmarks, only: %i[index create destroy]

      resource :profile, only: [:update]
    end
  end
end
