class ApplicationController < ActionController::Base
  # come back to this -- I was getting an authenticity error, possibly something from cors, but this lifecycle method works
  skip_before_action :verify_authenticity_token
end
