Rails.application.routes.draw do

  resources :proposals do 
    resources :machines 
  end
  
  root "items_assemblies#index"
  resources :machine_assembly_items
  resources :pick_one_groups
  resources :parts
  resources :machines
  post '/machines/preview', to: 'machines#preview'
  resources :model_assemblies
  resources :items_assemblies
  resources :assemblies do 
    resources :items_assemblies
  end
  
  resources :items
  resources :models do 
    resources :assemblies
    resources :model_assemblies
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
