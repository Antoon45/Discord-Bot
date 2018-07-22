const Discord = module.require("discord.js");
const MongoClient = module.require('mongodb').MongoClient;
let request = module.require('request');

module.exports.run = async (bot, message, args, userId, guildId, username) => {
    const city = args[0];
    const options = {
        url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a476821919baec9930e68ecda56821e3`,
        method: 'GET',
    };

    request(options, function (err, res, body) {
        let json = JSON.parse(body);

        let kelvinCalc = json.main.temp - 273.15; // convert kelvin to celcius
        let celciusRound = Math.round(kelvinCalc * 100) / 100; // round the temperature to nearest two decimals

        let windspeed = json.wind.speed;
        let weatherDescription = json.weather[0].description;
        let weatherIcon = json.weather[0].icon;
        let countryName = json.name;
        let humidity = json.main.humidity;

        let d = new Date();
        let getYear = d.getYear().toString().substr(-2);        
        let getMonth = d.getMonth();
        let getDay = d.getDate();

        console.log(json);

        const embed = new Discord.RichEmbed()
            .setColor("0x339966")
            .setTitle(countryName + ", " + json.sys.country) // rounding the temperature
            .setDescription(`**0${getDay}/0${getMonth}/${getYear}**`)
            .addField(name="Temp: ", value="🌡" + celciusRound + "°C", inline=true)
            .addField(name="Wind: ", value=windspeed + "m/s", inline=true)
        message.channel.send({ embed: embed });
    });
}
module.exports.help = {
    name: "weather"
}
/*

🌡
'const embed = new Discord.RichEmbed()
.setTitle('Current weather in ' + city)
.setAuthor(`Current weather in ${city}`)

.setColor(0x00AE86)
.setDescription('The text of the body, essentially')
.setFooter('Nice text at the bottom')

.setTimestamp()
.addField('Field Title', 'Field Value')

.addField('Inline Field', 'Hmm 🤔', true)
.addField('\u400b', '\u200b', true)
.addField('Second (3rd place) Inline Field', 'I\'m in the ZOONE', true);

message.channel.send({ embed: embed });

    const options2 = {
        url: `http://openweathermap.org/img/w/10d.png`,
        method: 'GET',
    }
    request(options2, function (err, res, body) {
    
    },


*/