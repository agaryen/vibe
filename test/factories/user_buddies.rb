FactoryBot.define do
  factory :user_buddy do
    user
    buddy { association :user }
  end
end
