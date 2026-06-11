require "fastlane"
require "spaceship"

key_id = ENV.fetch("ASC_API_KEY_ID")
issuer_id = ENV.fetch("ASC_ISSUER_ID")
key_filepath = ENV.fetch("ASC_API_KEY_PATH")
bundle_id = ENV.fetch("APP_IDENTIFIER", "com.tarunagarwal.ghostkey")

token = Spaceship::ConnectAPI::Token.create(
  key_id: key_id,
  issuer_id: issuer_id,
  filepath: key_filepath
)
Spaceship::ConnectAPI.token = token

app = Spaceship::ConnectAPI::App.find(bundle_id)
abort("App not found for #{bundle_id}") unless app

puts "app_id=#{app.id}"
puts "bundle_id=#{bundle_id}"

version = app.get_edit_app_store_version(platform: Spaceship::ConnectAPI::Platform::IOS)
if version
  puts "edit_version_id=#{version.id}"
  puts "edit_version_string=#{version.version_string}"
  puts "edit_version_state=#{version.app_version_state}"
  begin
    build = version.get_build
    if build
      puts "edit_version_build=#{build.app_version} (#{build.version}) id=#{build.id}"
    else
      puts "edit_version_build=none"
    end
  rescue => error
    puts "edit_version_build_error=#{error.message}"
  end
else
  puts "edit_version=none"
end

ready_submission = app.get_ready_review_submission(platform: Spaceship::ConnectAPI::Platform::IOS, includes: "items")
puts "ready_review_submission=#{ready_submission&.id || 'none'}"
puts "ready_review_submission_items=#{ready_submission&.items&.length || 0}"

in_progress = app.get_in_progress_review_submission(platform: Spaceship::ConnectAPI::Platform::IOS)
puts "in_progress_review_submission=#{in_progress&.id || 'none'}"
