class SessionSerializer < ActiveModel::Serializer
  attributes :username,
             :role,
             :status,
             :ref_id,
             :access_token,
             :refresh_token,
             :firebase_user_id
  def role
    object.klass
  end
end
