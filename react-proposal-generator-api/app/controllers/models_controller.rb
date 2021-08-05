class ModelsController < ApplicationController

  def index 
    models = Model.all

    render json: models

  end

end
