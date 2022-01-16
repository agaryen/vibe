task inquire_daily_statuses: :environment do
  client = Exponent::Push::Client.new

  puts '[inquire daily statuses] Start of the push broadcast'
  User
    .where.not(notification_token: nil)
    .find_in_batches(batch_size: 100)
    .with_index do |users, index|
      puts "[inquire daily statuses] Batch ##{index} starting"
      messages = users.map { |user| { to: user.notification_token, sound: 'default', body: "Will you go at the office tomorrow? It's time to decide!" } }
      handler = client.send_messages(messages)

      handler.errors.each do |error|
        puts "[inquire daily statuses] Errors: #{error}"
      end
    end
  puts '[inquire daily statuses] End of the push broadcast'
end

task inform_maybe_statuses: :environment do
  client = Exponent::Push::Client.new

  should_come_body = 'Your buddies will be at the office tomorrow. You should definitely come!'
  should_not_come_body = 'None of your buddies will be at the office tomorrow. You can stay home.'

  puts '[inform maybe statuses] Start of the push broadcast'
  results = Attendancy.new(day: 1.day.from_now).compute
  DailyStatus
    .answered_maybe
    .where(day: 1.day.from_now)
    .includes(:user)
    .find_in_batches(batch_size: 100)
    .with_index do |daily_statuses, index|
      puts "[inform maybe statuses] Batch ##{index} starting"
      messages = daily_statuses.map do |daily_status|
        body = results[daily_status.user_id] === Attendancy::YES ? should_come_body : should_not_come_body
        { to: daily_status.user.notification_token, sound: 'default', body: body}
      end
      handler = client.send_messages(messages)

      handler.errors.each do |error|
        puts "[inform maybe statuses] Errors: #{error}"
      end
    end
  puts '[inform maybe statuses] End of the push broadcast'
end
