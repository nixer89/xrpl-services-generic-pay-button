
fetch("https://donate.xumm.community/button.html").then(response => {
    return response.text();
}).then(data => {   
    var elements = document.getElementsByClassName('xumm-donate-button');

    for(var i = 0; i < elements.length; i++)
        elements[i].innerHTML = data;
});

function donateViaXumm() {
    try {
        console.log("requesting payment via XUMM")
        fetch('https://api.xumm.community/api/v1/initiate/simplePayment/')
        .then(function (response) { 
            if(response.ok)
                return response.json();
            else {
                console.log("xumm payment request not ok");
                console.log(response);
            };
        }).then(function (xummResponse) {
            console.log("Called xumm and got a response: " + JSON.stringify(xummResponse));
            if(xummResponse && xummResponse.next &&xummResponse.next.always)
                window.location.href = xummResponse.next.always;
            else
                console.log(JSON.stringify(xummResponse));
        });
    } catch(err) {
        console.log("something went wrong while requesting payment: ");
        console.log(JSON.stringify(err));
    }
};
