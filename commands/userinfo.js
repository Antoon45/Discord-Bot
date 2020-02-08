const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let userCreatedDate = message.author.createdAt
    let userCreatedTime = new Date(message.author.createdTimestamp)
    let avatar = message.author.avatarURL;


    let embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}#${message.author.discriminator}`)
        .setColor("0x666699")
        .setThumbnail(avatar)
        .addField("ID", `${message.author.id}`)
        .addField("Joined Discord", `${userCreatedDate.getUTCDay() + "/" + (userCreatedDate.getMonth() + 1) + "/" + userCreatedDate.getFullYear()}` + " - " + `${userCreatedTime.getHours() + ":" + userCreatedTime.getMinutes()}`)
    message.channel.send({ embed: embed });
}


module.exports.help = {
    name: "userinfo"
}