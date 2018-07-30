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


    modalContent.innerHTML += "Total: <font color='blue'>$" + totalPrice.toFixed(2).toString() + "</font><br>";
    modalContent.innerHTML += "<button type='submit' class='orderbtn' style='width: 9rem;'>Place Order</button>";

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