class User < ApplicationRecord
  has_secure_password

  attr_accessor :access_token, :refresh_token, :firebase_user_id

  enum status: { active: 1, inactive: 0 }
end
