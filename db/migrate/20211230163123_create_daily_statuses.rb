class CreateDailyStatuses < ActiveRecord::Migration[7.0]
  def change
    create_table :daily_statuses do |t|
      t.date :day
      t.references :user, null: false, foreign_key: true
      t.string :answer

      t.timestamps
    end
  end
end
