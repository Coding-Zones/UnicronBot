const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');



module.exports = class ModeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'move',
      usage: 'move',
      description: 'to move some one',
      type: client.types.MOD, //change this per command
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS'], //bots needed perms
      userPermissions: ['MOVE_MEMBERS'] //keep this if mod only command
    });
  }
 run(message, args) {
if (!args[0]) return;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === toLocaleLowerCase());

        if(!member) return message.channel.send("Unable to find the mentioned user in this guild.")

        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!channel.type === "voice") return message.channel.send("Unable to locate the voice channel. Make sure to mention a voice channel not a text channel!") 

        try {
            member.voice.setChannel(channel);
            message.channel.send("Success :white_check_mark: : Member Moved!")
        } 
        
        catch(error) {
            console.log(error);
            message.channel.send("Oops! An unknown error occured. Please try again later.")
        }

    }
}