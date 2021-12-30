require "test_helper"

class BuddiesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get buddies_create_url
    assert_response :success
  end
end
