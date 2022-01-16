require 'timeout'

class Attendancy
  YES = 'YES'
  NO = 'NO'
  MAYBE = 'MAYBE'
  ALL = [YES, NO, MAYBE]

  def initialize(day:)
    @day = day
    @daily_statuses = DailyStatus.where(day: @day)
  end

  def compute
    user_buddies = UserBuddy.all.group_by(&:user_id)
    tomorrow_statuses = @daily_statuses.index_by(&:user_id)
    attendancies =
      User.all.each_with_object({}) do |user, results|
        results[user.id] = tomorrow_statuses[user.id]&.answer
      end
    resolve_cyclic_dependencies(attendancies)

    while attendancies.values.include?(MAYBE) do
      attendancies.each do |user_id, answer|
        next if answer != MAYBE

        buddies = (user_buddies[user_id] || [])

        if buddies.empty?
          attendancies[user_id] = NO
        elsif buddies.any? { |buddy| attendancies[buddy.buddy_id].nil? }
          attendancies[user_id] = nil # still computing
        elsif buddies.any? { |buddy| attendancies[buddy.buddy_id] == YES }
          attendancies[user_id] = YES
        elsif buddies.all? { |buddy| attendancies[buddy.buddy_id] == NO }
          attendancies[user_id] = NO
        else
          # Cannot resolve this loop
        end
      end
    end

    attendancies
  end

  def resolve_cyclic_dependencies(attendancies)
    maybe_graph = UserBuddy.joins(user: :daily_statuses).merge(@daily_statuses.where(answer: MAYBE)).generate_graph
    maybe_graph.cycles.flatten.each do |user_id|
      attendancies[user_id] = YES
    end
  end
end
