const Command = require('../Command.js');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');


module.exports = class NekoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'neko',
            aliases: ['catgirl', 'nekomimi', 'nekos'],
            description: 'Nekos!',
            details: 'This command is NSFW in NSFW channels and not NSFW in normal channels!',
          examples: ['u!neko'],
          type: client.types.NSFW,
        });
    }

  async run(message, args) {
        if (!message.channel.nsfw) {
            const res = await snekfetch.get(`http://nekos.life/api/neko`);
            const preview = res.body.neko;

            const embed = new Discord.MessageEmbed()
                .setImage(preview)
                .setColor('#A187E0')
                .setFooter('http://nekos.life', 'https://a.safe.moe/3XYZ6.gif');
            return message.channel.send({ embed });

        } else {
            const res = await snekfetch.get(`http://nekos.life/api/lewd/neko`);
            const preview = res.body.neko;

            const embed = new Discord.MessageEmbed()
                .setImage(preview)
                .setColor('#A187E0')
                .setFooter('http://nekos.life', 'https://a.safe.moe/3XYZ6.gif');
            return message.channel.send({ embed });
        }
    }
}