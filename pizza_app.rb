def get_sizes()
    {"Small" => 8.00, "Medium" => 10.00, "Large" => 12.00}
end

def get_meats()
    ["Pepperoni", "Ham", "Bacon", "Chicken"]
end

def get_veggies()
    ["Peppers", "Onions", "Olives", "Pineapple"]
end

def get_pizza_price(size, meats, veggies, extra_cheese)
    unless get_sizes().has_key?(size); return 0; end

    price = get_sizes()[size]
    meats.each do |v|
        price += 0.75
    end

    veggies.each do |v|
        price += 0.50
    end

    if extra_cheese; price += 1.00; end
    price
end

def get_pizza_string(size, meats, veggies, extra_cheese)
    size_string = ""
    unless get_sizes().has_key?(size)
        size_string = "No"
    else
        size_string = size
    end

    meats_string = ""
    meats.each do |v|
        meats_string += "#{get_meats()[v]} "
    end

    veggie_string = ""
    veggies.each do |v|
        veggie_string += "#{get_veggies()[v]} "
    end

    pizza_string = "#{size_string} #{meats_string}#{veggie_string}pizza"
    if extra_cheese; pizza_string += " with Extra cheese"; end

    pizza_string
end