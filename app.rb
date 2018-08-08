require 'sinatra'
require_relative 'pizza_app.rb'

enable :sessions

get '/' do
  exveg_price = veggie_price()
  exmeat_price = meat_price()
  excheese_price = cheese_price()

  erb :order, locals:{veg_price: veggie_price(), meat_price: meat_price(), cheese_price: cheese_price, sizes: get_sizes().to_a, meats: get_meats(), veggies: get_veggies()}
end

post '/order' do
  redirect '/complete'
end

get '/complete' do
  erb :done
end