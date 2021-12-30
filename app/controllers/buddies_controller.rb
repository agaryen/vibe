class BuddiesController < ApplicationController
  def create
    current_user.buddy_ids = params[:buddies]
    redirect_to root_path
  end
end
