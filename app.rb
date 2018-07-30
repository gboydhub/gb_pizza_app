require 'sinatra'
require_relative 'pizza_app.rb'

enable :sessions

get '/' do
  erb :order
end