const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = (client, message) => {
  if (message.channel.type === 'dm' || !message.channel.viewable || message.author.bot) return;
    message.client.emit('messageafk', message)

 //automod
message.client.emit('moderation' , message)
 
 //antispam
    message.client.emit('antispam', message)
    
   client.on('message', message => {
	console.log(message.content);
}); 
  // Get disabled commands
  let disabledCommands = client.db.settings.selectDisabledCommands.pluck().get(message.guild.id) || [];
  if (typeof(disabledCommands) === 'string') disabledCommands = disabledCommands.split(' ');
  
  // Get points
  const { point_tracking: pointTracking, message_points: messagePoints, command_points: commandPoints } = 
    client.db.settings.selectPoints.get(message.guild.id);

  // Command handler
  const prefix = client.db.settings.selectPrefix.pluck().get(message.guild.id);
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\s*`);

  if (prefixRegex.test(message.content)) {

    // Get mod channels
    let modChannelIds = message.client.db.settings.selectModChannelIds.pluck().get(message.guild.id) || [];
    if (typeof(modChannelIds) === 'string') modChannelIds = modChannelIds.split(' ');

    const [, match] = message.content.match(prefixRegex);
    const args = message.content.slice(match.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let command = client.commands.get(cmd) || client.aliases.get(cmd); // If command not found, check aliases
    if (command && !disabledCommands.includes(command.name)) {

      // Check if mod channel
      if (modChannelIds.includes(message.channel.id)) {
        if (
          command.type != client.types.MOD || (command.type == client.types.MOD && 
          message.channel.permissionsFor(message.author).missing(command.userPermissions) != 0)
        ) {
            return; // Return early so Calypso doesn't respond
        }
      }

      // Check permissions
      const permission = command.checkPermissions(message);
      if (permission) {
        message.command = true; // Add flag for messageUpdate event
        return command.run(message, args);  
      }
    } else if ( 
      (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) &&
      message.channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS']) &&
      !modChannelIds.includes(message.channel.id)
    ) {
      const embed = new MessageEmbed()
        .setTitle('Hi, I\'m Unicron. Do you need help?')
        .setThumbnail('https://i.pinimg.com/originals/7d/c8/ac/7dc8ac1c164ac5b0076f0c49e60b9aa1.jpg')
        .setDescription(`You can see all my commands by typing \`${prefix}help\` command.`)
        .addField('***Invite***', oneLine`
          You can add me to your server  
          [here](https://discordapp.com/oauth2/authorize?client_id=829467455243681836&scope=bot&permissions=403008599)!
        `)
        .addField('***Support***', oneLine`
          If you have questions, suggestions, or found a bug, please join the 
          [Unicron Support Server](https://discord.gg/UceHZmnHGB)!
        `)
        .setFooter('DM Itz_Danny#0001 to speak directly with the developer!')
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);
    }
  }
  // Auto publis messages in an announcement channel
  if (message.channel.type === 'news') {
    message.crosspost()
};
