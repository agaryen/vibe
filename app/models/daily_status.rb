require 'rgl/adjacency'
require 'rgl/path'

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

    resolve_cyclic_dependencies(user_answers, day)

    while user_answers.values.include?(MAYBE) do
      user_answers.each do |user_id, answer|
        next if answer != MAYBE

        buddies = (@user_buddies[user_id] || [])

        if buddies.empty?
          user_answers[user_id] = NO
        elsif buddies.any? { |buddy| user_answers[buddy.buddy_id].nil? }
          user_answers[user_id] = nil # still computing
        elsif buddies.any? { |buddy| user_answers[buddy.buddy_id] == YES }
          user_answers[user_id] = YES
        elsif buddies.all? { |buddy| user_answers[buddy.buddy_id] == NO }
          user_answers[user_id] = NO
        else
          # unresolvable this loop
        end
      end
    end

    user_answers
  end

  def self.resolve_cyclic_dependencies(user_answers, day)
    maybe_friendships = UserBuddy.joins(user: :daily_statuses).merge(DailyStatus.where(day: day).where(answer: MAYBE))
    maybe_graph = RGL::DirectedAdjacencyGraph[*maybe_friendships.pluck(:user_id, :buddy_id).flatten]
    maybe_graph.cycles.flatten.each do |user_id|
      user_answers[user_id] = YES
    end
  end
end
