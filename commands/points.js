const getPoints = module.require("../helpers.js").getPoints
const Discord = module.require("discord.js");
const MongoClient = module.require('mongodb').MongoClient;


module.exports.run = async (bot, message, args, userId, guildId, username) => {

	console.log(await getPoints(guildId, userId))
	let userPoints = await getPoints(guildId, userId);

	let embed = new Discord.RichEmbed()
		.setColor("0x339966")
		.addField(message.author.username, "Points: " + userPoints)
	message.channel.send({ embed: embed });
}
module.exports.help = {
	name: "points"
}