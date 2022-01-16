
class DailyStatus < ApplicationRecord
  belongs_to :user

  scope :answered_yes, -> { where(status: Attendancy::YES) }
  scope :answered_maybe, -> { where(status: Attendancy::MAYBE) }
  scope :answered_no, -> { where(status: Attendancy::NO) }
end
