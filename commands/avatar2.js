const Discord = module.require("discord.js");
const MongoClient = module.require('mongodb').MongoClient;

module.exports.run = async (bot, message, args, userId, guildId, username) => {

    message.channel.send(message.author.avatarURL);

}
module.exports.help = {
    name: "avatar2"
}
