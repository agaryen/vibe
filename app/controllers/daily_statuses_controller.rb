class DailyStatusesController < ApplicationController
  def create
    @daily_status = current_user.daily_statuses.find_or_initialize_by(day: params[:daily_status][:day])
    @daily_status.answer = params[:daily_status][:answer]
    @daily_status.save!
    redirect_to root_path(day: @daily_status.day)
  end
end
