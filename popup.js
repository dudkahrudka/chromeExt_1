var submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click",function() {


    var years = document.getElementById('years').value
    var months = document.getElementById('months').value
    var days = document.getElementById('days').value
    var hours = document.getElementById('hours').value
    var minutes = document.getElementById('minutes').value
    var seconds = document.getElementById('seconds').value
    var myEvent = document.getElementById('myevent').value

    var message = {
        years: years,
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        myEvent: myEvent
    }


    chrome.storage.sync.set({'value': message}, function() {
        alert("saved");
    });
});

