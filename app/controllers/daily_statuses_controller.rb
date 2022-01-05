class DailyStatusesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_daily_status
  skip_forgery_protection

  def show
    render json: @daily_status.to_json(only: %i(day answer))
  end

  def create
    respond_to do |format|
      format.html do
        @daily_status = current_user.daily_statuses.find_or_initialize_by(day: params[:daily_status][:day])
        @daily_status.answer = params[:daily_status][:answer]
        @daily_status.save!
        redirect_to root_path(day: @daily_status.day)
      end

      format.json do
        @daily_status.answer = params[:daily_status][:answer]
        @daily_status.save!
        head :created
      end
    end
  end

  private

  # TODO: Messy initialization and creation. IMO, we should create the record before the user even answered, and then just fill the answer column
  def set_daily_status
    @daily_status = current_user.daily_statuses.find_or_initialize_by(day: 1.day.from_now)
  end
end
