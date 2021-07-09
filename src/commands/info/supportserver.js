const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class SupportServerCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'supportserver',
      aliases: ['support', 'ss'],
      usage: 'supportserver',
      description: 'Displays the invite link to Unicron\'s Discord Support Server.',
      type: client.types.INFO
    });
  }
  run(message) {
    const embed = new MessageEmbed()
      .setTitle('Support Server')
      .setThumbnail('https://i.pinimg.com/originals/7d/c8/ac/7dc8ac1c164ac5b0076f0c49e60b9aa1.jpg')
      .setDescription('Click [here](https://discord.gg/UceHZmnHGB) to join the Unicron Support Server!')
      .addField('Other Links', 
        '**[Invite Me](https://discordapp.com/oauth2/authorize?client_id=829467455243681836&scope=bot&permissions=403008599) | ' +
        ''
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};