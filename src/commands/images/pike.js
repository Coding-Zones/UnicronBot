const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = class BakaCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'poke',
      aliases: ['emoji-poke'],
      usage: 'poke @user',
      description: 'poke someone',
      type: client.types.IMAGES
    });
  }
async run (message, args) {
    let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/poke");
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${message.author.username} pokes ${victim.displayName}`)
        .setImage(body.url)
         message.channel.send(embed);
      }
  }