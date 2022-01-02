class DailyStatusesController < ApplicationController
  before_action :authenticate_user!

  def show
    binding.pry
    render json: @daily_status.to_json(only: %i(day answer))
  end

  def create
    @daily_status = current_user.daily_statuses.find_or_initialize_by(day: params[:daily_status][:day])
    @daily_status.answer = params[:daily_status][:answer]
    @daily_status.save!
    redirect_to root_path(day: @daily_status.day)
  end

  private

  def set_daily_status
    @daily_status = current_user.daily_statuses.find_or_initialize_by(day: 1.day.from_now)
  end
end
