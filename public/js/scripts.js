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

function displayConfirm()
{
    var modal = document.getElementById("confirm");
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