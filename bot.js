const Discord = require('discord.js');
const client = new Discord.Client();
var Channels = ["686244189167550488","686244230712000516","686244262802882575","686244301680017629","686244374153003091","686244409041223938","686253539718332486","686244487940669567","686244516717658147","686244572992634905","686244639623217179","686244674473689110","686244839406174215","686244886621585523"];
console.log(Channels[0])
var Token = process.env.BOT_TOKEN;
var TimeBetween = .002;
var Total = 0
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})
client.on('message', message => {
  var Valid = false;
  var ArrayLength = Channels.length
  for (var i = 0; i < ArrayLength; i++) {
    var Current = Channels[i]
    if (message.channel.id === Current) {
      Valid = true;
      break
    }
  }
  if (Valid) {
    Total++
    const Message = 'Adverts: '+(Total-1).toString()
    console.log(Message)
    message.guild.channels.find("name", Message).setName("Adverts: "+Total.toString());
  }
});
client.login(Token);
