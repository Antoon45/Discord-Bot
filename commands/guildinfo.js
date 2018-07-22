const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(bot.user.username)
        .setDescription("This is " + (bot.user.username) + "s info!")
        .setColor("0x666699")
        .setThumbnail(bot.user.avatarURL)
        .addField("Owner of the server: Anton")
        .addField("Server ID", `${message.channel.guild.id}`)
        .addField("Channel ID", `${message.channel.id}`)
        .addField("Members in the server", `${message.guild.memberCount}`)
    message.channel.send({ embed: embed });
    console.log(bot.guild)

}

module.exports.help = {
    name: "guildinfo"
}