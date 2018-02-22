function setOnline() {
    var state = document.getElementById("state");
    state.innerHTML = "Connected with TiFu";
}

function setOffline() {
    var state = document.getElementById("state");
    state.innerHTML = "Offline<br/>Please connect to the internet.";
}

function testInternet(win, fail) {
    $.ajax({
        url: "http://www.google.de/blank.html",
        timeout: 5000,   //timeout to 5s
        type: "GET",
        cache: false
    }).done(win).fail(fail);
}

var app = {
    // Application Constructor
    initialize: function () {
        // ReSharper disable once Html.EventNotResolved
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        var confirmElement = document.getElementById("confirm");
        var spielernrpre = document.getElementById("spielernrpre");
        var spielernrex = document.getElementById("spielernrex");

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        confirmElement.addEventListener('click', saveValue);

        spielernrpre.addEventListener('keyup', function () {
           
            var ex = document.getElementById("spielernrex");
            if (this.value.length > 1) {
                ex.focus();
            }
        });

        spielernrpre.value = getValueKey("spielernrpre");
        spielernrex.value = getValueKey("spielernrex");

        testInternet(setOnline, setOffline);
        initDweet();
    }

};
app.initialize();