const superagent = require('superagent');
const Command = require('../Command.js');
const { oneLine, stripIndent } = require('common-tags');
const { MessageEmbed } = require('discord.js');

module.exports = class AnalCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'anal',
      usage: 'anal',
      description: oneLine`
        fetches a random pic of a anal for your viewing pleasure
      `,
      type: client.types.NSFW,
      examples: ['anal']
    });
  }
    async run (message, args) {
     if (!message.channel.nsfw) return this.sendErrorMessage(message, 0, "Please try this command again in a NSFW channel") 
  
 const { body } = await superagent
        .get("https://nekos.life/api/v2/img/anal");
        
        const embed = new MessageEmbed()
        .setColor("#ff9900")
        .setTitle(`anal!`)
        .setImage(body.url) 
        message.channel.send({embed})
    }
};