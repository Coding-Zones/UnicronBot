const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class EmSayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'emsay',
      usage: 'emsay [embed Hexcolor] <message>',
      description:"Sends a embed in the channel.",
      type: client.types.FUN,
      examples: ['emsay #ffffhello world']
    });
  }
  run(message, args) {
    
      message.delete();
    if(!args[0]) return this.sendErrorMessage(message, 0, 'Please provide a message for me to say');
    
    var emcolor = {};
    let color = args[0];
    if(color.startsWith("#")) {
        emcolor = color;
      args.shift();
    } else emcolor = "#992D22";


    const msg = message.content.slice(message.content.indexOf(args[0]), message.content.length);

const embed = new MessageEmbed()
         .setTitle("Embed")
         
         .setDescription(msg)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(emcolor);
      message.channel.send(embed);
}
}; 
