const Discord = module.require("discord.js");
const MongoClient = module.require('mongodb').MongoClient;
let request = module.require('request');

module.exports.run = async (bot, message, args, userId, guildId, username) => {
    const player = args[0];
    console.log(player)
    const options = {
        url: `https://secure.runescape.com/m=hiscore/index_lite.ws?player=` + player,
        method: 'GET',
    };

    request(options, function (err, res, body) {
        let data = body.split('\n');
        const arr = [];

        data.forEach(function (item) {
            let items = item.split(',');
            arr.push({
                Position: items[0],
                level: items[1],
                xp: items[2]
            });
        });
        let embed = new Discord.RichEmbed()
        .setTitle(`${player} | Total level: ${arr[0].level}`)
        .setColor("0x666699")
        .setThumbnail(message.author.avatarURL)
        .addField("Attack", `${arr[1].level}`, true)
        .addField("Defence", `${arr[2].level}`, true)
        .addField("Strength", `${arr[3].level}`, true)
        .addField("Constitution", `${arr[4].level}`, true)
        .addField("Ranged", `${arr[5].level}`, true)
        .addField("Prayer", `${arr[6].level}`, true)
        .addField("Magic", `${arr[7].level}`, true)
        .addField("Cooking", `${arr[8].level}`, true)
        .addField("Woodcutting", `${arr[9].level}`, true)
        .addField("Fletching", `${arr[10].level}`, true)
        .addField("Fishing", `${arr[11].level}`, true)
        .addField("Firemaking", `${arr[12].level}`, true)
        .addField("Crafting", `${arr[13].level}`, true)
        .addField("Smithing", `${arr[14].level}`, true)
        .addField("Mining", `${arr[15].level}`, true)
        .addField("Herblore", `${arr[16].level}`, true)
        .addField("Agility", `${arr[17].level}`, true)
        .addField("Thieving", `${arr[18].level}`, true)
        .addField("Slayer", `${arr[19].level}`, true)
        .addField("Farming", `${arr[20].level}`, true)
        .addField("Runecrafting", `${arr[21].level}`, true)
        .addField("Hunter", `${arr[22].level}`, true)
        .addField("Construction", `${arr[23].level}`, true)
        .addField("Summoning", `${arr[24].level}`, true)
        /* .addField("Dungeoneering", `${arr[25].level}`)
       .addField("Divination", `${arr[26].level}`)
        .addField("Invention", `${arr[27].level}`)*/
        message.channel.send({ embed: embed });
    });
}

module.exports.help = {
    name: "rs"
}
