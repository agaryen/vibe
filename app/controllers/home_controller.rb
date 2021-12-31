class HomeController < ApplicationController
  def show
    @users = User.all.where.not(id: current_user.id)
    @attendancy = Attendancy.new(day: 1.day.from_now).compute
  end
end
