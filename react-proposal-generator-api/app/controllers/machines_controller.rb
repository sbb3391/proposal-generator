class MachinesController < ApplicationController
  
  def create
    machine = Machine.create(model_id: params[:model][:id], location_city: "Little Rock")

    render json: machine
  end
end
