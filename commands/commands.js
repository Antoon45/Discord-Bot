const { RichEmbed } = module.require("discord.js");
const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, con) => {
	try {
		await message.channel.send(`Commands: \n\n${bot.commands.map(cmd => `\`${cmd.help.name}\``).join(", ")}`);
	} catch(e) {
		message.channel.send("Commands could not be loaded.");
	}
}

module.exports.help = {
	name: "commands"
}