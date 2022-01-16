
class DailyStatus < ApplicationRecord
  belongs_to :user

  scope :answered_yes, -> { where(answer: Attendancy::YES) }
  scope :answered_maybe, -> { where(answer: Attendancy::MAYBE) }
  scope :answered_no, -> { where(answer: Attendancy::NO) }
end
