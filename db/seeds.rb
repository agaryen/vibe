fixtures_directories = ['fixtures']
fixtures_directories.each do |fixtures_dir|
  fixtures_files =
    Dir.glob("#{fixtures_dir}/**/*.yml").map { |fixture| fixture.gsub!(/\.yml/, '').gsub!(%r{.*fixtures/}, '') }
  ActiveRecord::FixtureSet.create_fixtures fixtures_dir, fixtures_files
  fixtures_files.each { |fixtures| Rails.logger.info "#{fixtures.singularize.camelize.constantize.count} #{fixtures}." }
end
