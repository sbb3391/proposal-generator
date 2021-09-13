class ProposalsController < ApplicationController

  def index
    proposals = Proposal.all

    render json: proposals
  end

  def show
    proposal = Proposal.find(params[:id])

    render json: proposal
  end

  def create
    proposal = Proposal.create(name: params[:proposal_name], customer_id: params[:customer_id])

    render json: proposal
  end
end
