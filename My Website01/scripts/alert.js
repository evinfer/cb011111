const txtoutput=document.getElementById("donout");

function submitFunction() {
    let cardno = document.getElementById("cardno").value
    if (cardno =="")
    {
        alert("Something Went Wrong Please Check!!")
        txtoutput.innerText = '*Please Check Your Details Correctly*'
    }
    else{
        alert("You Have Donate Successfully!! Thank You!!")
        txtoutput.innerText = `Successful!! Thankyou For Your Kindness!!`
    }
}
            