const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs')

//can replace MyCommandName with your command name 
module.exports = class version extends Command {
  constructor(client) {
    super(client, {
      name: 'version', //command name
      usage: 'version',
      aliases: ['ver'], //usage for the command, example: ping (prepends prefix in the help command btw)
      description: 'Gives the current Unicron version number', //description for it
      type: client.types.INFO //can be any available types, look in this.types in client.js file
    });
  }
  async run(message, args) {
  // your code that will execute
fs.readFile('package.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const embed = new MessageEmbed()
        const pack = JSON.parse(jsonString)
        const ver = pack.version
        embed.setTitle('Unicron Version')
        .setThumbnail('https://i.pinimg.com/originals/7d/c8/ac/7dc8ac1c164ac5b0076f0c49e60b9aa1.jpg')
        .addField('Version is:', `\`${ver}\``, true)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed); // => "Customer address is: Infinity Loop Drive"
} catch(err) {
        console.log('Error parsing JSON string:', err)
        
    }
})
  }
}