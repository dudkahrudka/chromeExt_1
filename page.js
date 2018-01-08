window.onload = function() {
  chrome.storage.sync.get('value', function(message) {
    initializeClock('clockdiv', setDeadline(message.value), message.value.myEvent);
  })
}

chrome.storage.onChanged.addListener(function(changes) {
  clearInterval(timeinterval);
  initializeClock('clockdiv', setDeadline(changes.value.newValue), changes.value.newValue.myEvent);
})

var timeinterval;

function setDeadline(message) {
    var deadline = message.months + " " + message.days + " " + message.years + " " + message.hours + ":" + message.minutes + ":" + message.seconds + " GMT+0100";
    return deadline
}


function initializeClock(id, endtime, eventMessage) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  var myEvent = document.getElementById('event');
  myEvent.innerHTML = "Until " + eventMessage;
  timeinterval = setInterval(updateClock, 1000);

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();

}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}
