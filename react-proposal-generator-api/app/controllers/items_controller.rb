class ItemsController < ApplicationController

  def index 
    items = Assembly.find_by_id(params[:assembly_id]).items

    render json: items
  end

end
