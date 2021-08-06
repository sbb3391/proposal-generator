class AssembliesController < ApplicationController

  def index
    assemblies = Model.find_by_id(params[:model_id]).assemblies

    render json: assemblies
  end

end
