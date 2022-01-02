class AddNotificationTokenToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :notification_token, :string
  end
end
