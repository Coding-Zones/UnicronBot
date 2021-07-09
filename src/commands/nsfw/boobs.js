const Command = require('../Command.js');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');


module.exports = class BoobsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'boobs',
            aliases: ['boobies', 'bobs'],
            description: 'Show a picture of boobs!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['u!boobs'],
            type: client.types.NSFW,
        });
    }

  async run(message, args) {
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);

        } else {

            const id = [Math.floor(Math.random() * 10930)];
            const res = await snekfetch.get(`http://api.oboobs.ru/boobs/${id}`);
            const preview = res.body[0]["PREVIEW".toLowerCase()];
            const image = `http://media.oboobs.ru/${preview}`;

            const embed = new Discord.MessageEmbed()
                .setFooter('http://oboobs.ru/')
                .setImage(image)
                .setColor('#CEA0A6');
            return message.channel.send({ embed });
        }
    }
}