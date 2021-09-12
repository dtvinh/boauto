module TokenConcern
  def verify_and_assign_token(logger)
    response = { data: {},  errors: [], status: :ok }
    if logger&.authenticate session_params[:password]
      payload = SessionSerializer.new(logger).as_json
      response[:data][:access_token] = generate_access_token(payload)
      response[:data][:refresh_token] = generate_refresh_token(payload)
    else
      response[:errors] << { error: I18n.t('authorized.login_failure') }
      response[:status] = :bad_request
    end
    response
  end

  def generate_access_token(payload)
    JwtService.encode(payload)
  end

  def generate_refresh_token(payload)
    JwtService.encode(payload, expired_at: Time.zone.now + 30.minutes, type: :refresh)
  end
end
