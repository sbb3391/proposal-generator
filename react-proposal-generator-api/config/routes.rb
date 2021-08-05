Rails.application.routes.draw do
  resources :parts
  resources :machines
  resources :model_assemblies
  resources :items_assemblies
  resources :assemblies
  resources :items
  resources :models do 
    resources :model_assemblies
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
