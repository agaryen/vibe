require "test_helper"

class AttendancyTest < ActiveSupport::TestCase
  YES = Attendancy::YES
  NO = Attendancy::NO
  MAYBE = Attendancy::MAYBE

  test 'YES and YES' do
    user_a = create_user_with_answer(YES)
    user_b = create_user_with_answer(YES)
    create(:user_buddy, user: user_a, buddy: user_b)

    results = Attendancy.new(day: 1.day.from_now).compute

    assert_equal YES, results[user_a.id]
    assert_equal YES, results[user_b.id]
  end

  test 'YES and NO' do
    user_a = create_user_with_answer(YES)
    user_b = create_user_with_answer(NO)
    create(:user_buddy, user: user_a, buddy: user_b)

    results = Attendancy.new(day: 1.day.from_now).compute

    assert_equal YES, results[user_a.id]
    assert_equal NO, results[user_b.id]
  end

  test 'NO and NO' do
    user_a = create_user_with_answer(NO)
    user_b = create_user_with_answer(NO)
    create(:user_buddy, user: user_a, buddy: user_b)

    results = Attendancy.new(day: 1.day.from_now).compute

    assert_equal NO, results[user_a.id]
    assert_equal NO, results[user_b.id]
  end

  test 'MAYBE and YES' do
    user_a = create_user_with_answer(MAYBE)
    user_b = create_user_with_answer(YES)
    create(:user_buddy, user: user_a, buddy: user_b)

    results = Attendancy.new(day: 1.day.from_now).compute

    assert_equal YES, results[user_a.id]
    assert_equal YES, results[user_b.id]
  end

  test 'MAYBE and NO' do
    user_a = create_user_with_answer(MAYBE)
    user_b = create_user_with_answer(NO)
    create(:user_buddy, user: user_a, buddy: user_b)

    results = Attendancy.new(day: 1.day.from_now).compute

    assert_equal NO, results[user_a.id]
    assert_equal NO, results[user_b.id]
  end


  test 'MAYBE and MAYBE AND YES' do
    user_a = create_user_with_answer(MAYBE)
    user_b = create_user_with_answer(MAYBE)
    user_c = create_user_with_answer(YES)
    create(:user_buddy, user: user_a, buddy: user_b)
    create(:user_buddy, user: user_b, buddy: user_c)

    results = Attendancy.new(day: 1.day.from_now).compute

    assert_equal YES, results[user_a.id]
    assert_equal YES, results[user_b.id]
    assert_equal YES, results[user_c.id]
  end

  test 'MAYBE and NO and YES' do
    user_a = create_user_with_answer(MAYBE)
    user_b = create_user_with_answer(NO)
    user_c = create_user_with_answer(YES)

    create(:user_buddy, user: user_a, buddy: user_b)
    create(:user_buddy, user: user_a, buddy: user_c)

    results = Attendancy.new(day: 1.day.from_now).compute

    assert_equal YES, results[user_a.id]
    assert_equal NO, results[user_b.id]
    assert_equal YES, results[user_c.id]
  end

  test 'MAYBE and MAYBE and NO' do
    user_a = create_user_with_answer(MAYBE)
    user_b = create_user_with_answer(MAYBE)
    user_c = create_user_with_answer(NO)
    user_d = create_user_with_answer(YES)

    create(:user_buddy, user: user_a, buddy: user_b)
    create(:user_buddy, user: user_a, buddy: user_c)
    create(:user_buddy, user: user_b, buddy: user_d)

    results = Attendancy.new(day: 1.day.from_now).compute

    assert_equal YES, results[user_a.id]
    assert_equal YES, results[user_b.id]
    assert_equal NO, results[user_c.id]
    assert_equal YES, results[user_d.id]
  end

  # deadlock case
  test 'MAYBE and MAYBE' do
    user_a = create_user_with_answer(MAYBE)
    user_b = create_user_with_answer(MAYBE)
    create(:user_buddy, user: user_a, buddy: user_b)
    create(:user_buddy, user: user_b, buddy: user_a)

    results = Attendancy.new(day: 1.day.from_now).compute

    assert_equal YES, results[user_a.id]
    assert_equal YES, results[user_b.id]
  end

  # indirect deadlock case
  test 'cyclic MAYBE' do
    user_a = create_user_with_answer(MAYBE)
    user_b = create_user_with_answer(MAYBE)
    user_c = create_user_with_answer(MAYBE)
    user_d = create_user_with_answer(MAYBE)
    create(:user_buddy, user: user_a, buddy: user_b)
    create(:user_buddy, user: user_b, buddy: user_c)
    create(:user_buddy, user: user_c, buddy: user_d)
    create(:user_buddy, user: user_d, buddy: user_a)

    results = Attendancy.new(day: 1.day.from_now).compute

    assert_equal YES, results[user_a.id]
    assert_equal YES, results[user_b.id]
    assert_equal YES, results[user_c.id]
    assert_equal YES, results[user_d.id]
  end

  test 'MAYBE and NO_ANSWER' do
    user_a = create_user_with_answer(MAYBE)
    user_b = create(:user)
    create(:user_buddy, user: user_a, buddy: user_b)
    create(:user_buddy, user: user_b, buddy: user_a)

    results = Attendancy.new(day: 1.day.from_now).compute

    assert_nil results[user_a.id]
    assert_nil results[user_b.id]
  end

  test 'MAYBE and MAYBE and NO_ANSWER' do
    user_a = create_user_with_answer(MAYBE)
    user_b = create_user_with_answer(MAYBE)
    user_c = create(:user)

    create(:user_buddy, user: user_a, buddy: user_b)
    create(:user_buddy, user: user_b, buddy: user_c)
    create(:user_buddy, user: user_c, buddy: user_a)

    results = Attendancy.new(day: 1.day.from_now).compute

    assert_nil results[user_a.id]
    assert_nil results[user_b.id]
    assert_nil results[user_c.id]
  end

  test 'MAYBE and MAYBE but no friends' do
    user_a = create_user_with_answer(MAYBE)
    user_b = create_user_with_answer(MAYBE)
    create(:user_buddy, user: user_a, buddy: user_b)

    results = Attendancy.new(day: 1.day.from_now).compute

    assert_equal NO, results[user_a.id]
    assert_equal NO, results[user_b.id]
  end


  private

  def create_user_with_answer(answer)
    user = create(:user)
    create(:daily_status, user: user, answer: answer)
    user
  end
end