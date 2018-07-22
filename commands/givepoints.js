const getPoints = module.require("../helpers.js").getPoints
const Discord = module.require("discord.js");
const MongoClient = module.require('mongodb').MongoClient;

module.exports.run = async (bot, message, args, userId, guildId, username) => {

    message.channel.send("Work in progress.");
}
module.exports.help = {
    name: "givepoints"
}
