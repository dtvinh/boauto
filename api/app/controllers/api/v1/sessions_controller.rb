module Api
  module V1
    class SessionsController < ApplicationController
      def create
        render json: { message: 'Success' }
      end
    end
  end
end
