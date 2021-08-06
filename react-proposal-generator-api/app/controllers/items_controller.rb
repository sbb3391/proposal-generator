class ItemsController < ApplicationController

  def index 
    items = Assembly.find_by_id(params[:assembly_id]).items

    byebug
    render json: items
  end

end
