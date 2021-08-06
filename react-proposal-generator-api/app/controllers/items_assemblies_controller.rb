class ItemsAssembliesController < ApplicationController
  def index 
    items_assemblies = ItemsAssembly.where(assembly_id: params[:assembly_id])

    render json: items_assemblies
  end

end
