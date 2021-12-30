class CreateUserBuddies < ActiveRecord::Migration[7.0]
  def change
    create_table :user_buddies do |t|
      t.references :user, null: false, foreign_key: true
      t.references :buddy, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
