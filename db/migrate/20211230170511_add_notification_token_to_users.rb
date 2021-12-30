class AddNotificationTokenToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :notifcation_token, :string
  end
end
