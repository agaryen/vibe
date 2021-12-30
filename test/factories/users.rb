FactoryBot.define do
  sequence :email do |n|
    "email#{n}@factory.com"
  end

  factory :user do
    email
    password { 'str0ngPwd1$34' }
  end
end
