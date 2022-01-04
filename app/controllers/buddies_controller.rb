class BuddiesController < ApplicationController
  before_action :authenticate_user!
  skip_forgery_protection

  def create
    current_user.buddy_ids = params[:buddy_ids].split(',')
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { head :ok }
    end
  end

  def index
    buddies = current_user.buddies.to_a
    users = User.all.where.not(id: current_user.id).order(:email)
    render json: { items: users.map { |user| { id: user.id, email: user.email, buddy: buddies.include?(user) } } }
  end
end
