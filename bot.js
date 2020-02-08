const botConfig = module.require("./botConfig.json");
const Discord = module.require("discord.js");
const fs = module.require("fs");

const prefix = botConfig.prefix;

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017", async (err, server) => {
    if (err) { console.log("Could not connect to mongodb"); return; }
    const db = server.db('Nenonen');
    serverlist = db.collection('serverlist');
});


fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("No commands to load!")
        return;
    }
    console.log(`Loading ${jsfiles.length} commands`)

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(`${i + 1}: ${f} loaded!`)
        bot.commands.set(props.help.name, props);
    });
});

/** Status constants */
const STATUS = {
    ONLINE: 'online',
    OFFLINE: 'offline',
    AWAY: 'idle',
    DND: 'dnd'
}

bot.on('ready', async () => {

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link)
    } catch (e) {
        console.log(e.stack)
    }
    const createGuild = async (guild) => {
        const _createMemberInGuild = async (guildId, memberId) => {
            const structure = {
                /** Member structure */
                id: memberId,
                points: 0, // initital points
                wins: 0 // initital wins
            }
            await serverlist.update({ guildId: guildId, 'members.id': { $ne: memberId } }, { $addToSet: { members: structure } });
        }

        const structure = {
            /** Guild structure */
            id: guild.id,
            lottery: {},
            members: []
        }
        /** Create guild */
        await serverlist.update({ guildId: guild.id }, { $setOnInsert: structure }, { upsert: true });

        /** Create each member of guild */
        await Promise.all(guild.members.map(async (member) => {
            await _createMemberInGuild(guild.id, member.id);
        }));
    }

    console.log(`${bot.user.username}: Successfully Connected`);
    //console.log(bot.guilds.find().toString());
    bot.user.setPresence({ game: { name: "!commands", type: 0 } });

    try {
        await Promise.all(bot.guilds.map(async (guild) => {
            await createGuild(guild);
        }));
    } catch (e) {
    }

    setInterval(async () => {
        /** Check presence every 1 second */
        bot.guilds.forEach(guild => {
            checkPresence(guild);
        });
    }, 20000);

    //let res = serverlist.find({});
    //res.forEach(r => console.log(r));

    const checkPresence = async (guild) => {
        guild.members.forEach(member => {
            if (member.presence.status === STATUS.ONLINE) {
                serverlist.update({ guildId: guild.id, 'members.id': member.id }, { $inc: { 'members.$.points': 100 } });
            }
        });
    }

});

bot.on("disconnected", function () { process.exit(1); });
bot.on("message", async message => {

    const username = message.author.username;
    const userId = (message.author.id).toString();
    const guildId = (message.channel.guild.id).toString();

    const checkIfBot = message.author.bot;
    const messageArray = message.content.split(/\s+/g);
    const command = messageArray[0];
    const args = messageArray.slice(1);


    let cmd = bot.commands.get(command.slice(prefix.length))
    if (cmd) cmd.run(bot, message, args, userId, guildId, username);
    if (!command.startsWith(prefix)) return;
    if (checkIfBot) return;
    if (message.channel.type === "dm") return;
});

bot.login(botConfig.token);
