module Api
  module V1
    class TokensController < ApplicationController
      include TokenConcern

      def create
        user = resolve_token(refresh_params[:refresh_token])
        render json: assign_token(user)
      end

      private

      def refresh_params
        params.permit(:refresh_token)
      end
    end
  end
end
