class Users::NotificationTokensController < ApplicationController
  before_action :authenticate_user!

  def create
    notification_token = params[:notification_token]
    return head :bad_request unless notification_token

    current_user.update!(notification_token: notification_token)
    head :created
  end
end
