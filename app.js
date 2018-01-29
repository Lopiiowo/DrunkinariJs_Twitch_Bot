var fs = require('fs');
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

client.on("chat", (channel, user, message, self) => {
    var CHannel = channel.substring(1);
    const commandFiles = fs.readdirSync(`./commands/${CHannel}`);
    for (const file of commandFiles) {
        var CHannel = channel.substring(1);
        var command = require(`./commands/${CHannel}/${file}`);
        if (message == command.name) {
            client.say(command.channel, command.text);
        }
    }
});