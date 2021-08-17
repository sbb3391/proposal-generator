class MachinesController < ApplicationController

  def show
    machine = Machine.find(params[:id])

    render json: machine, machine_id: params[:id]
  end

  def index
  end 
  
  def create
    machine = Machine.create(model_id: params[:model][:id])


    params[:model][:assemblies].each do |assembly|
      assembly_id = assembly[:id]

      assembly[:items].each do |item| 
        assembly_item_id = ItemsAssembly.find_by(assembly_id: assembly_id, item_id: item[:itemId]).id
        machine.machine_assembly_items.build(assembly_item_id: assembly_item_id)
      end
    end

    machine.save

    render json: machine
  end
end
