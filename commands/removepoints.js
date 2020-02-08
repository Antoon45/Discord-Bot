const getPoints = module.require("../helpers.js").getPoints
const Discord = module.require("discord.js");
const MongoClient = module.require('mongodb').MongoClient;


module.exports.run = async (bot, message, args, userId, guildId, username) => {

	let userPoints = await getPoints(guildId, userId);    
    let pointsAmount = args[1];
    console.log(pointsAmount)
    console.log(userPoints)
    if (typeof args[1] === 'undefined' || typeof args[0] === 'undefined'|| !Number.isInteger(parseInt(args[1]))) {
        message.channel.send("?givepoints [username] [amount of points]");
        return;
    }
    let userArray = message.mentions.users.array();
    if (userArray.length === 0) {
        message.channel.send('Invalid user');
        return;
    }
    let userArrayId = userArray[0].id;
    removePoints = userPoints - pointsAmount;
    if (Number.isInteger(parseInt(pointsAmount))) {
        serverlist.update({ "guildId": guildId, "members.id": userArrayId }, { '$set': { 'members.$.points': parseInt(removePoints) } });
        message.channel.send("Removed " + pointsAmount + " from " + username + " balance.");
    }
}
module.exports.help = {
    name: "removepoints"
}