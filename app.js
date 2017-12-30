var tmi = require('tmi.js');
var login = require('./login.js');

var options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: `${login.username}`,
        password: `${login.password}`
    },
    channels: ["#akinari_live"]
};

var client = new tmi.client(options);
client.connect();

client.on("chat", function (channel, userstate, message, self) {
    if (message == "!bad"){
        client.action("#akinari_live", "you're noob!")
    };
    if (self) return;
    // Do your stuff.
});