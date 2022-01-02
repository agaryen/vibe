class HomeController < ApplicationController
  def show
    if signed_in?
      UserBuddy.generate_visual_graph
      @users = User.all.where.not(id: current_user.id)
      @day = params[:day] || 1.day.from_now.to_date
      @attendancies = Attendancy.new(day: @day).compute
      @daily_status = current_user.daily_statuses.find_or_initialize_by(day: @day)
    end
  end
end
