console.log("preload image");
if (document.images) {
    img1 = new Image();
    img1.src = "https://pay.xumm.community/xummPay.svg";
}

document.addEventListener("DOMContentLoaded", () => {
    let xummPayButtons = document.getElementsByClassName('xumm-pay-button');
    let xummPayButtonsNB = document.getElementsByClassName('xumm-pay-button-no-border');

    console.log("found xummPayButtons: " + xummPayButtons.length);
    console.log("found xummPayButtonsNB: " + xummPayButtonsNB.length);

    if(xummPayButtons && xummPayButtons.length > 0) {
        setTimeout(() => replacePayButtons(xummPayButtons),0);
    }

    if(xummPayButtonsNB && xummPayButtonsNB.length > 0) {
        setTimeout(() => replacePayButtonsNB(xummPayButtonsNB),0);
    }
});

function replacePayButtons(xummPayButtons) {
    fetch("https://pay.xumm.community/button-border.html").then(response => {
        return response.text();
    }).then(data => {
        console.log("replacing xumm pay buttons");
        for(var i = 0; i < xummPayButtons.length; i++)
        xummPayButtons[i].innerHTML = data;    
    });
}

function replacePayButtonsNB(xummPayButtonsNB) {
    fetch("https://pay.xumm.community/button-no-border.html").then(response => {
        return response.text();
    }).then(data => {
        console.log("replacing xumm pay buttons NB");
        for(var i = 0; i < xummPayButtonsNB.length; i++)
        xummPayButtonsNB[i].innerHTML = data;    
    });
}

function payViaXumm() {
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
                window.location = xummResponse.next.always;
            else
                console.log(JSON.stringify(xummResponse));
        });
    } catch(err) {
        console.log("something went wrong while requesting payment: ");
        console.log(JSON.stringify(err));
    }
};
