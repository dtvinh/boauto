module TokenConcern
  def verify_and_assign_token(logger)
    response = { data: {},  errors: [], status: :ok }
    if logger&.authenticate session_params[:password]
      response[:data] = assign_token(logger)
    else
      response[:errors] << { error: I18n.t('authorized.login_failure') }
      response[:status] = :bad_request
    end
    response
  end

  def resolve_token(token)
    payload = JwtService.decode(token)
    User.active.find_by(username: payload[:username])
  end

  def assign_token(logger)
    payload = SessionSerializer.new(logger).as_json
    access_token = access_token(payload)
    refresh_token = refresh_token(payload)
    { access_token: access_token, refresh_token: refresh_token }
  end

  def access_token(payload)
    JwtService.encode(payload)
  end

  def refresh_token(payload)
    options = {
      exp: (Time.zone.now + 30.minutes).to_i,
      type: :refresh
    }
    JwtService.encode(payload, options)
  end
end
