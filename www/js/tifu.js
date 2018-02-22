var storage = window.localStorage;

var initDweet = function () {

    //var fingerprint = new window.Fingerprint().get();
    var dweetName = "auria_it.tifu";

    window.cordova.plugins.backgroundMode.enable();

    dweetio.get_latest_dweet_for(dweetName, function (err, dweet) {
        dweet = dweet[0]; // Dweet is always an array of 1
        pushDweet(dweet);
    });

    dweetio.listen_for(dweetName, function (dweet) {
        pushDweet(dweet);
    });

};

var getValueKey = function (key) {
    return storage.getItem(key); 
};

var getValue = function() {
    var pre = storage.getItem("spielernrpre"); 
    var ex = storage.getItem("spielernrex"); 

    return pre + "-" + ex;
};
var saveValue = function () {
    var spielernrpre = document.getElementById("spielernrpre");
    var spielernrex = document.getElementById("spielernrex");

    storage.setItem("spielernrpre", spielernrpre.value);
    storage.setItem("spielernrex", spielernrex.value);
    var confirmElement = document.getElementById("confirm");
    confirmElement.innerHTML = "Ändern";
};

function pushDweet(dweet) {
    var msg = dweet["content"]["the_message"];
    var empfaenger = dweet["content"]["empfaenger"];
    
    empfaenger = empfaenger.split("#");
    var spielernr = getValue();
  
    if (!spielernr || empfaenger.indexOf(spielernr) > -1) {

        var htmlMsg = msg.replace(new RegExp(","), "<br/>");
        var eOutput = document.getElementById("output");
        eOutput.innerHTML = htmlMsg;
        
        window.cordova.plugins.notification.local.schedule({
            title: "Neues Spiel",
            text: msg,
            foreground: true
        });
    }
}