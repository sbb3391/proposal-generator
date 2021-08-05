class ModelAssembliesController < ApplicationController
  def index
    model_assemblies = ModelAssembly.all.where(model_id: params[:model_id])

    render json: model_assemblies
  end
end
