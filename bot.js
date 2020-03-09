const Discord = require('discord.js');
const client = new Discord.Client();
var Token = process.env.BOT_TOKEN;
var Admins = ["350638288702275586"];
const prefix = "bba!"
var AnnouncementsChannel = null
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.channels.find("name", "admin-chat").send(
  "**━━━━━[ BIG BRAIN BOT ]━━━━━**\n"+
  "**-** Prefix: "+prefix+"\n"+
  "**-** To see a list of commands type: "+prefix+"help");
})
client.on('message', message => {
  let guild = client.guilds.get('686215263670108219')
  var BotName = client.user.username
  var Author = message.author.username
  var Verified = false
  for (var i = 0; i < Admins.length; i++){
    var CurrentItem = Admins[i]
    if (message.member.user.id==CurrentItem){
      Verified = true
      break
    }
  }
  if (BotName.toString()!=Author.toString()&&Verified){
    if (message.content==prefix+"help"){
      message.channel.send(
        "**━━━━━[ BIG BRAIN BOT ]━━━━━**\n"+
        prefix+"`help`\n"+
        "• View a list of commands.\n"+
        prefix+"`admin`\n"+
        "• Allow someone to use this bot, second arg user id.\n"+
        prefix+"`setannounce`\n"+
        "• Set the announcements channel, second arg #channel.\n"+
        prefix+"`announce`\n"+
        "• Announce in the announcements channel, current: "+AnnouncementsChannel+". Second arg announcement."
      )
      return
    }
    const args = message.content.slice(prefix.length).split(' ');
    const PlayerMention = message.mentions.users.first();
    const ChannelTag = message.mentions.channels.first();
    const command = args.shift().toLowerCase();
    if (command=="admin"&&PlayerMention){
      var Found = false;
      for (var i = 0;i < Admins.length;i++){
        var CurrentItem = Admins[i]
        if (CurrentItem==PlayerMention.id){
          Found = true
          break
        }
      }
      if (!Found){
        Admins.push(PlayerMention.id)
      }
    }
    if (command=="setannounce"&&ChannelTag){
      AnnouncementsChannel = ChannelTag
      message.channel.send("Epic! Set the announcements channel to: "+AnnouncementsChannel)
    }
    if (command=="announce"&&args[0]){
      if (!AnnouncementsChannel){
        message.channel.send("Error! No announcements channel set.")
      }else{
        message.channel.send("Epic! Sending announcement.\n"+
        "`"+message.content.slice(prefix.length+9)+"`"
        )
        AnnouncementsChannel.send(message.content.slice(prefix.length+8))
      }
    }
  }
});
client.login(Token);
