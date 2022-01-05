class Users::NotificationTokensController < ApplicationController
  def create
    notification_token = params[:notification_token]
    return head :bad_request unless notification_token

    current_user.update!(notification_token: notification_token)
    head :created
  end
end
