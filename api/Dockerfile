ARG RUBY_VERSION=ruby:3.1.2

FROM $RUBY_VERSION

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev cron

RUN mkdir /app
WORKDIR /app

RUN gem install bundler
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

RUN bundle install

COPY . /app
