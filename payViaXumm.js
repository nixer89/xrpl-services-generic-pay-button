
fetch("https://pay.xumm.community/button.html").then(response => {
    return response.text();
}).then(data => {   
    var elements = document.getElementsByClassName('xumm-pay-button');

    for(var i = 0; i < elements.length; i++)
        elements[i].innerHTML = data;
});

function payViaXumm() {
    fetch('https://api.xumm.community/api/v1/initiate/simplePayment/')
    .then(function (response) { return response.json(); }).then(function (xummResponse) {
        if(xummResponse && xummResponse.next &&xummResponse.next.always)
            window.location.href = xummResponse.next.always;
        else
            console.log(JSON.stringify(xummResponse));
    });
};
