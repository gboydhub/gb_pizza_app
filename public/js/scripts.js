function pageInit()
{
    document.getElementById("order-1").style.display="block";
}

function switchModal(modalCurrent, modalNext)
{
    var thisModal = document.getElementById(`order-${modalCurrent}`);
    var nextModal = document.getElementById(`order-${modalNext}`);

    thisModal.style.display = "none";
    nextModal.style.display = "block";
}

function displayConfirm(sizes, veg_price, meat_price, cheese_price)
{
    var delivery_fee = 0.0;
    var isDelivery = document.getElementById("delivery").checked;
    var miles = document.getElementById("miles").value;
    var addr = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    if(isDelivery)
    {
        if(miles.length < 1 || parseInt(miles) < 1)
        {
            alert("Invalid number of miles");
            return;
        }
        miles = parseInt(miles);
        if(addr.length < 1 || city.length < 1 || state.length < 1)
        {
            alert("Please enter a valid address.");
            return;
        }
    }
    var modal = document.getElementById("confirm");
    var modalContent = document.getElementById("final");

    var totalPrice = 0.00;

    var sizeRadio = document.getElementsByName("psize");
    var selectedSize = "";
    for(var i = 0; i < sizeRadio.length; i++)
    {
        if(sizeRadio[i].checked)
        {
            selectedSize = sizeRadio[i].value;
            totalPrice = sizes[i][1];
        }
    }

    var meatRadio = document.getElementsByName("pmeat");
    var selectedMeats = [];
    for(var i = 0; i < meatRadio.length; i++)
    {
        if(meatRadio[i].checked)
        {
            selectedMeats.push(meatRadio[i].value);
            totalPrice += meat_price;
        }
    }

    var vegRadio = document.getElementsByName("pveggie");
    var selectedVeggies = [];
    for(var i = 0; i < vegRadio.length; i++)
    {
        if(vegRadio[i].checked)
        {
            selectedVeggies.push(vegRadio[i].value);
            totalPrice += veg_price;
        }
    }

    var cheeseRadio = document.getElementsByName("excheese");
    var extraCheese = false;
    if(cheeseRadio[0].checked)
    {
        extraCheese = true;
        totalPrice += cheese_price;
    }

    modalContent.innerHTML = `You ordered a ${selectedSize} pizza`;
    if(extraCheese)
    {
        modalContent.innerHTML += " with extra cheese.<br><br>";
    }
    else
    {
        modalContent.innerHTML += ".<br><br>";
    }

    if(selectedMeats.length > 0)
    {
        modalContent.innerHTML += `Meat Toppings<br>`;
        for(var i = 0; i < selectedMeats.length; i++)
        {
            modalContent.innerHTML += "<font color='red'>" + selectedMeats[i] + "<br>";
        }
        modalContent.innerHTML += "<br>"
    }
    else
    {
        modalContent.innerHTML += "No Meat Toppings<br><br>";
    }
    if(selectedMeats.length > 0)
    {
        modalContent.innerHTML += `Veggie Toppings<br>`;
        for(var i = 0; i < selectedVeggies.length; i++)
        {
            modalContent.innerHTML += '<font color="green">' + selectedVeggies[i] + "<br>";
        }
        modalContent.innerHTML += "<br>"
    }
    else
    {
        modalContent.innerHTML += "No Veggie Toppings<br><br>";
    }

    if(isDelivery)
    {
        var del_price = 5.00;
        del_price += miles * 0.30;
        modalContent.innerHTML += "Delivery Fee: <font color='blue'>$" + del_price.toFixed(2).toString() + "</font><br>";
        modalContent.innerHTML += `Address:<br>${addr} ${city}, ${state}<br><br>`;
        totalPrice += del_price;
    }

    document.getElementById("final-price").value = totalPrice.toFixed(2).toString();
    modalContent.innerHTML += "Total: <font color='blue'>$" + totalPrice.toFixed(2).toString() + "</font><br>";
    modalContent.innerHTML += "<div id='paypal-button-container'></div>";
    modalContent.innerHTML += "<div id='confirm-button'></div>";
    renderPayPal(totalPrice.toFixed(2).toString());
    //modalContent.innerHTML += "<button type='submit' class='orderbtn' style='width: 9rem;'>Place Order</button>";

    modal.style.display = "block";
}

window.onclick = function(event)
{
    var modal = document.getElementById("confirm");
    if(event.target == modal)
    {
        modal.style.display = "none";
    }
}

function showDelivery()
{
    document.getElementById("deliver-div").style.visibility = "visible";
}
function hideDelivery()
{
    document.getElementById("deliver-div").style.visibility = "hidden";
}

function renderPayPal(amount)
{
    paypal.Button.render({

        // Set your environment

        env: 'sandbox', // sandbox | production

        // Specify the style of the button

        style: {
            label: 'checkout',
            size:  'small',    // small | medium | large | responsive
            shape: 'pill',     // pill | rect
            color: 'gold'      // gold | blue | silver | black
        },

        // PayPal Client IDs - replace with your own
        // Create a PayPal app: https://developer.paypal.com/developer/applications/create

        client: {
            sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
            production: '<insert production client id>'
        },

        payment: function(data, actions) {
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: amount, currency: 'USD' }
                        }
                    ]
                },
                experience: {
                    input_fields: {
                      no_shipping: 1
                    }
                }//,
                // flow_config: {
                //     landing_page_type: "Billing",
                //     bank_txn_pending_url: "http://gb-pizza-app.herokuapp.com/order",
                //     return_uri_http_method: "POST"
                // }
            });
        },
        onAuthorize: function(data, actions) {
            return actions.payment.execute().then(function() {
                window.location = "/complete"
            });
        }

        }, '#paypal-button-container');
}