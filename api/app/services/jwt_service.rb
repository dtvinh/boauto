class JwtService
  def self.encode(payload, **args)
    payload[:expired_at] = args[:expired_at] || Time.zone.now + 5.minutes
    payload[:type] = args[:type] || :token
    JWT.encode payload, Rails.application.secrets.secret_key_base
  end

  def self.decode(token)
    body = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
    HashWithIndifferentAccess.new body
  rescue JWT::ExpiredSignature
    raise UnauthorizedError, ({ access_token: I18n.t('token.expired') })
  end
end
