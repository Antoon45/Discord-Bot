const getPoints = module.require("../helpers.js").getPoints
const Discord = module.require("discord.js");
const MongoClient = module.require('mongodb').MongoClient;

module.exports.run = async (bot, message, args, userId, guildId, username) => {

    let chance = Math.floor((Math.random() * 100) + 1);
    let gambleNumber = args[0];
    let userPoints = await getPoints(guildId, userId);
    let user = message.author.username;

    const calc = async () => {
        sum = userPoints - args[0];
        if (gambleNumber > userPoints) {
            errorMessage();
            return;
        } else if (chance < 80) {
            message.channel.send(user + " rolled a " + chance + " and lost 😔 " + args[0] + " points and now has " + sum + " points");
        } else if (chance >= 80 && chance <= 95) {
            x2 = args[0] * 2;
            sum = userPoints + x2;
            message.channel.send(user + " rolled a " + chance + " and won 2x " + args[0] + " points and now has " + sum + " points 🤑 ");
        } else {
            x3 = args[0] * 3;
            sum = userPoints + x3;
            message.channel.send("CASH IN BABY! 💰 " + user + " rolled a " + chance + " and won 3x " + args[0] + " points and now has " + sum + " points");
        }
        serverlist.update({ "guildId": guildId, "members.id": userId }, { '$set': { 'members.$.points': sum } });
    }

    const errorMessage = async () => {
        let embed = new Discord.RichEmbed()
            .setColor("0xff0000")
            .addField("Uh oh! An error occured.", "Correct usage: !gamble 50 or you don't have enough points")
        message.channel.send({ embed: embed });
    }

    if (Number.isInteger(parseInt(gambleNumber))) {
        if (gambleNumber >= 50 && gambleNumber <= 1e13 || gambleNumber == undefined) {
            if (!gambleNumber.toString().includes('.')) {
                calc();
            } else {
                errorMessage();
            }
        } else {
            errorMessage();
        }
    } else {
        errorMessage();

    }
}

module.exports.help = {
    name: "gamble"
}
