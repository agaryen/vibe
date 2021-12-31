ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods

  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all


  teardown do
    if ENV['GRAPH']
      UserBuddy.generate_visual_graph(name: "tmp/#{method_name}")
      Dir.glob('tmp/**.dot').each { |file| File.delete(file)}
    end
  end
end
