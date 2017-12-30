var fs = require('fs');
var tmi = require('tmi.js');
var login = require('./login.js');

const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
    var command = require(`./commands/${file}`);
    }

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
    if (message != command.name) return;
    
    if (message == command.name) {
        client.action(command.channel, command.text);
    }

    if (self) return;
});
