// this code is from https://www.npmjs.com/package/minecraft-protocol
var mc = require('minecraft-protocol');
require('dotenv').config()
var client = mc.createClient({
  host: process.env.MINECRAFT_HOST || "localhost",   // optional
  port: process.env.PORT || 25565,         // optional
  username: process.env.MINECRAFT_USERNAME,
  password: process.env.MINECRAFT_PASSWORD,
});
client.on('chat', function(packet) {
  // Listen for chat messages and echo them back.
  var jsonMsg = JSON.parse(packet.message);
  if(jsonMsg.translate == 'chat.type.announcement' || jsonMsg.translate == 'chat.type.text') {
    var username = jsonMsg.with[0].text;
    var msg = jsonMsg.with[1];
    if(username === client.username) return;
    client.write('chat', {message: msg.text});
  }
});
