FactoryBot.define do
  factory :daily_status do
    day { 1.day.from_now }
    user
    answer { 'Maybe' }
  end
end
