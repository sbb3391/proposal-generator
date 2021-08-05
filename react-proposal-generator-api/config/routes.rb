Rails.application.routes.draw do
  resources :parts
  resources :machines
  resources :model_assemblies
  resources :parts_assemblies
  resources :assemblies_parts
  resources :assemblies
  resources :items
  resources :models
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
