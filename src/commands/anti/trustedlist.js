const Command = require('../Command.js');
const Discord = require("discord.js")
const db = require("quick.db")
 const ms = require('parse-ms')
module.exports = class TrustedlistCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'trustedlist',
            description: 'Vouch user!',
            type: client.types.ANTI
        });
    }
  async run(message, args) {
        let guild = message.guild.iconURL()
   
          let wordlist = new Discord.MessageEmbed()
           .setThumbnail(guild)
         .setFooter(message.author.username, message.author.displayAvatarURL)
         let database = db.get(`trustedusers_${message.guild.id}`)
         if(database && database.length) {
            let array =[]
              database.forEach(m => {
              array.push(`<@${m.user}>`)
            })
         
            wordlist.addField('** Trusted List **', `${array.join("\n")}`)
        }
        return message.channel.send(wordlist);
}}