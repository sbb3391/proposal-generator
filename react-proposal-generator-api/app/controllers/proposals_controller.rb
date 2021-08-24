class ProposalsController < ApplicationController

  def index
    proposals = Proposal.all

    render json: proposals
  end

  def show
    proposal = Proposal.find(params[:id])

    render json: proposal
  end
end
