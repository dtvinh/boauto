class JwtService
  def self.encode(payload, **args)
    payload[:exp] = args[:exp] || (Time.zone.now + 5.minutes).to_i
    payload[:type] = args[:type] || :token
    JWT.encode payload, Rails.application.secrets.secret_key_base
  end

  def self.decode(token)
    body = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
    HashWithIndifferentAccess.new body
  rescue JWT::ExpiredSignature
    raise UnauthorizedError, ({ token: I18n.t('token.expired') })
  rescue StandardError => _e
    raise UnauthorizedError, ({ token: I18n.t('token.invalid') })
  end
end
