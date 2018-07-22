const getPoints = module.require("../helpers.js").getPoints
const Discord = module.require("discord.js");
const MongoClient = module.require('mongodb').MongoClient;

module.exports.run = async (bot, message, args) => {
    let guildId = (message.channel.guild.id).toString();
    let pointsAmount = args[1];

    const errorMessage_Permission = async () => {
        let embed = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Oh no! An error occured.", "You do not have permission to execute this command.")
        return message.channel.send({ embed: embed });
    }

    if (message.member.roles.some(r => ["Administrator", "UltrawideMasterRace"].includes(r.name))) {

        if (typeof args[1] === 'undefined' || typeof args[0] === 'undefined' || !Number.isInteger(parseInt(args[1]))) {
            message.channel.send("?addpoints [username] [amount of points]");
            return;
        }
        let userArray = message.mentions.users.array();
        if (userArray.length === 0) {
            message.channel.send('Invalid user');
            return;
        }
        let userArrayId = userArray[0].id;
        if (Number.isInteger(parseInt(pointsAmount))) {
            serverlist.update({ "guildId": guildId, "members.id": userArrayId }, { '$inc': { 'members.$.points': parseInt(pointsAmount) } });
            let embed = new Discord.RichEmbed()
                .setAuthor(`${message.author.username}#${message.author.discriminator}`)
                .setColor("0x339966")
                .addField("Points", "+" +  pointsAmount )
            message.channel.send({ embed: embed });
           //message.channel.send("Added " + pointsAmount + " points to " + args[0] + " balance");
        }
    } else {
        errorMessage_Permission();
        return;
    }
}
module.exports.help = {
    name: "addpoints"
}
