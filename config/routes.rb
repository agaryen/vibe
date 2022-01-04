Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
  }

  resources :buddies, only: [:create, :index]
  resource :daily_statuses, only: [:show, :create]

  root to: 'home#show'
end
