class DailyStatus < ApplicationRecord
  YES = 'YES'
  NO = 'NO'
  MAYBE = 'MAYBE'

  belongs_to :user

  def self.compute(day:)
    @tomorrow_statuses = DailyStatus.where(day: day).index_by(&:user_id)
    @user_buddies = UserBuddy.all.group_by(&:user_id)

    user_answers =
      User.all.each_with_object({}) do |user, results|
        results[user.id] = @tomorrow_statuses[user.id]&.answer
      end

    while user_answers.values.include?(MAYBE) do
      user_answers.each do |user_id, answer|
        next if answer != MAYBE

        buddies = (@user_buddies[user_id] || [])

        if buddies.empty?
          user_answers[user_id] = NO
        elsif buddies.any? { |buddy| user_answers[buddy.buddy_id] == YES }
          user_answers[user_id] = YES
        elsif buddies.all? { |buddy| user_answers[buddy.buddy_id] == NO || user_answers[buddy.buddy_id].nil? }
          user_answers[user_id] = NO
        else
          # This checks if we have a deadlocked hesitant friendship
          friendship_buddy_id =
            buddies.find do |buddy|
              bud_buddies = (@user_buddies[buddy.buddy_id] || [])
              bud_buddies.map(&:buddy_id).include?(user_id) && user_answers[buddy.buddy_id] == MAYBE
            end

          if friendship_buddy_id
            user_answers[user_id] = YES
            user_answers[friendship_buddy_id] = YES if user_answers.key?(friendship_buddy_id) # perf
          else
            # only maybes, we need to re-compute them
          end
        end
      end
    end

    user_answers
  end
end
