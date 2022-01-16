task inquire_daily_statuses: :environment do
  client = Exponent::Push::Client.new

  puts '[inquire daily statuses] Start of the push broadcast'
  User.where.not(notification_token: nil)
    .find_in_batches(batch_size: 100)
    .with_index do |users, index|
    puts "[inquire_daily_statuses] Batch ##{index} starting"
    messages = users.map { |user| { to: user.notification_token, sound: 'default', body: "Will you go at the office tomorrow? It's time to decide!" } }
    handler = client.send_messages(messages)

    handler.errors.each do |error|
      puts "[inquire_daily_statuses] Errors: #{error}"
    end
  end
  puts '[inquire daily statuses] End of the push broadcast'
end
