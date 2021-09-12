module ErrorHandler
  extend ActiveSupport::Concern

  included do
    rescue_from UnauthorizedError do |e|
      error_response(e.errors, :unauthorized)
    end
  end

  private

  def error_response(error, status)
    payload = error.is_a?(String) ? { message: error } : error
    render json: { error: payload, status: status }, status: status
  end
end
