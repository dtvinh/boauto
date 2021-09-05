FROM ruby:2.7.2

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client vim

RUN useradd -m -u 1000 rails
RUN mkdir /app && chown rails /app

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

USER rails

WORKDIR /app

COPY --chown=rails Gemfile Gemfile.lock /app/

RUN bundle config set app_config .bundle
RUN bundle config set path .cache/bundle
RUN --mount=type=cache,uid=1000,target=/app/.cache/bundle bundle install && \
  mkdir -p vendor && \
  cp -ar .cache/bundle vendor/bundle
RUN bundle config set path vendor/bundle

COPY --chown=rails . /app
EXPOSE 3000

CMD ["bin/rails", "server", "-b", "0.0.0.0"]
