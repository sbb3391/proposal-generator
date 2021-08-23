class ProposalsController < ApplicationController

  def index
    proposals = Proposal.all

    render json: proposals
  end
end
