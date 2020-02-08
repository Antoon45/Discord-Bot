const Discord = module.require("discord.js");
let request = module.require('request');

module.exports.run = async (message, args) => {
    const APP_ID = process.env.WEATHER_API_ID
    const city = args[0];
    const options = {
        url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}`,
        method: 'GET',
    };

    request(options, function (err, res, body) {
        let json = JSON.parse(body);
        console.log(json);

        const embeddedMessage = async (countryName, getYear, getMonth, getDay) => {
            const embed = new Discord.RichEmbed()

            message.channel.send({ embed: embed });
        }
    });
}
module.exports.help = {
    name: "weather"
}
