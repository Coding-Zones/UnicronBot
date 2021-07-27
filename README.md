# Unicron-Bot

Unicorn Bot is a multipurpose discord bot that has 180+ command
 
# ABOUT                              
Unicorn Bot is a customizable bot, fully customizable Discord bot that is constantly growing. She comes packaged with a variety of commands and a multitude of settings that can be tailored to your server's specific needs. Her codebase also serves as a base framework to easily create Discord bots of all kinds. You can invite her to your Discord server using this link! Also, you can join the official Unicron Support Server for all questions, suggestions, and assistance!

# FEATURES 
***200+*** commands and counting across 12 different categories!

***Administration***: A huge amount of settings to customize with commands like setprefix, setwelcomemessage, and setverificationrole
***Moderation***: Commands such as kick, ban, and mute to assist your moderator staff
***Fun & Games***: Tons of fun commands like trivia, meme, emojify, and a variety of animal pic commands like cat, dog, and fox

***Information***: Commands like userinfo and serverinfo for general utility

***IMAGES***: This are some good images to look at the embrace the beauty ness of it

***ANIMALS***: This are some beautiful animals we love and Unicorn has there adorable pics of them

***Color***: Change your Discord color with commands like color, createcolor and random-color

***ECONOMY***: This are game currency use to buy some perks in shop and enjoy the entertainment of Unicorn Economy 

***Owner***: Owner specific commands like eval and servers

***Miscellaneous***: All other commands like feedback and bugreport
Unicorn  also comes packed with a variety of features, such as:

***BACKUPS***: This commands are use to save all messages,channels,roles,settings in a server

***ANTINUKE***: This is a command that only the server owner can perform with

***MUSIC***: This are quality music which has a good background and more exclusive than Amazon
 
***LEVELS***: This are epic level ranks that use to qualify a user messages and ranks

Auto role assignment
Server verification via reactions
Welcome messages and farewell messages

***Logging*** for mod commands and various events

***Moderator only*** channels

***A starboard***

***Auto kicking*** when a warn limit is reached
Auto random colors when members join
Per command disabling
And much more! There are over 30+ settings to tweak!

## Installation

You can add Unicron to your server with [this](https://discordapp.com/oauth2/authorize?client_id=829467455243681836&scope=bot&permissions=403008599) link! Alternatively, you can clone this repo and host the bot yourself.
```
git clone https://github.com/Coding-Zones/UnicronBot.git
```
After cloning, run an
```
npm install
```
to snag all of the dependencies. Of course, you need [node](https://nodejs.org/en/) installed. I also strongly recommend [nodemon](https://www.npmjs.com/package/nodemon) as it makes testing *much* easier.

## Setting Up

You have to create a `config.json` file in order to run the bot (you can use the example file provided as a base). Your file should look something like this:
```
{
  "token": "your_token_here",
  "ownerId": "your_ID_here",
  "bugReportChannelId": "bug_report_channel_ID_here",
  "feedbackChannelId": "feedback_channel_ID_here",
  "serverLogId": "server_log_ID_here",
  "apiKeys": {
    "catApi": "your_API_key_here",
    "googleApi": "your_API_key_here"
  }
}
```
Visit the Discord [developer portal](https://discordapp.com/developers/applications/) to create an app and use the client token you are given for the `token` option. `ownerId` is your own Discord snowflake. `bugReportChannelId`, `feedbackChannelId`, and `serverLogId` should be set to respective text channels on your own server. To get keys for supported APIs, vist:

  * [TheCatAPI](https://thecatapi.com/)
  * [Google APIs](https://console.developers.google.com/apis/)

After your `config.json` file is built, you have enable `Privileged Intents` on your Discord [developer portal](https://discordapp.com/developers/applications/). You can find these intents under the "Bot" section, and there are two ticks you have to switch on. For more information on Gateway Intents, check out [this](https://discordjs.guide/popular-topics/intents.html#the-intents-bit-field-wrapper) link.

Once done, feel free to launch Unicron using the command `node app.js` or `nodemon app.js`. If on Linux, you can also kick off using the `start.sh` script. If you need additional help setting up, join the [Unicron Support Server](https://discord.com/invite/3rPangn4uT)!

**Important Note:** Do not use Heroku to host Unicron! Unicron uses SQLite as its database which backs up its data store on disk. Heroku clears its contents often, so your database will be wiped. Read more [here](https://devcenter.heroku.com/articles/sqlite3).
