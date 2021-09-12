module Api
  module V1
    class SessionsController < ApplicationController
      include TokenConcern

      def create
        user = User.find_by(username: session_params[:username])
        render json: verify_and_assign_token(user)
      end

      private

      def session_params
        params.require(:session).permit(:username, :password)
      end
    end
  end
end
