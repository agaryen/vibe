class HomeController < ApplicationController
  def show
    if signed_in?
      UserBuddy.generate_visual_graph
      @users = User.all.where.not(id: current_user.id)
      @attendancies = Attendancy.new(day: 1.day.from_now).compute
    end
  end
end
