// Load environment variables
require('dotenv').config();

const {
    Client,
    RichEmbed,
    Collection,
    ReactionCollector,
    Message,
    MessageEmbed,
    MessageAttachment,
    Intents
} = require('discord.js');

const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")

const client = new Client({
    disableEveryone: true,
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
});

const mongoose = require("mongoose")

const fs = require("fs");
const {
    get
} = require('http');

client.commands = new Collection();
client.aliases = new Collection();

const commandFiles = fs.readdirSync("./Commands/new").filter(file => file.endsWith(".js"))
const commands = [];
client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./Commands/new/${file}`);
    commands.push(command.data.toJSON());
    console.log(command.data.name)
    client.commands.set(command.data.name, command);
}

client.once('ready', async () => {

    await mongoose.connect(
        process.env.MONGODB_URI, {
            keepAlive: true
        })

    const clientID = client.user.id;
    const rest = new REST({
        version: "9"
    }).setToken(process.env.DISCORD_TOKEN);

    (async () => {
        try {

                console.log('Writing to GUILD.')
                await rest.put(
                    Routes.applicationGuildCommands(clientID, process.env.TEST_GUILD_ID), {
                        body: commands
                    },
                );
                console.log('Writing to CLIENT.')
                await rest.put(
                    Routes.applicationCommands(clientID), {
                        body: commands
                    },
                );
        } catch (error) {
            console.error(error);
        }
    })();

    const guildCount = client.guilds.cache.size;
    console.log(guildCount)

    /*let goal = '';

    if (guildCount > 0 && guildCount <= 75) { // If guildCount is over 0 and is less than or equal to 75.
        goal = 75
    }
    if (guildCount > 75 && guildCount <= 100) { // If guildCount is over 75 and is less than or equal to 100.
        goal = 100
    }
    if (guildCount > 100 && guildCount <= 125) { // If guildCount is over 100 and is less than or eqal to 125.
        goal = 125
    }
    if (guildCount > 125 && guildCount <= 150) { // If guildCount is over 125 and is less than or eqal to 150.
        goal = 150
    }
    if (guildCount > 150 && guildCount <= 175) { // If guildCount is over 150 and is less than or eqal to 175.
        goal = 175
    }
    if (guildCount > 175 && guildCount <= 200) { // If guildCount is over 175 and is less than or eqal to 200.
        goal = 200
    }
    if (guildCount > 200 && guildCount <= 225) { // If guildCount is over 200 and is less than or eqal to 225.
        goal = 225
    }
    */
    client.user.setActivity({
        name: `LEGO Star Wars`,
        type: 'PLAYING'
    })
    /*
    setInterval(() => {

        let goal = '';

    if (guildCount > 0 && guildCount <= 75) {
        goal = 75
    }
    if (guildCount > 75 && guildCount <= 100) { // If guildCount is over 75 and less than or equal to 100.
        goal = 100
    }
    if (guildCount > 100 && guildCount <= 125) { // If guildCount is over 100, and less than or eqal to 125.
        goal = 125
    }
    if (guildCount > 125 && guildCount <= 150) { // If guildCount is over 125, and less than or eqal to 150.
        goal = 150
    }
    if (guildCount > 150 && guildCount <= 175) { // If guildCount is over 150, and less than or eqal to 175.
        goal = 175
    }
    if (guildCount > 175 && guildCount <= 200) { // If guildCount is over 175, and less than or eqal to 200.
        goal = 200
    }


        client.user.setActivity({
            name: `${client.guilds.cache.size}/${goal} servers! (GOAL)`,
            type: 'WATCHING'
        })
    }, 10 * 60000);*/
    //client.quizzers = require("./JSON Files/droppoints.json")

    var countdown = require('moment-countdown');
    var moment = require("moment-timezone");
    var momentDurationFormatSetup = require("moment-duration-format");

    momentDurationFormatSetup(moment);
    typeof moment.duration.fn.format === "function";
    // true
    typeof moment.duration.format === "function";
    // true

    let verifiedDate = "2020-12-17"
    let verifiedFormat = moment(verifiedDate).format("[Verified on] [**]dddd, MMMM Do, YYYY[**]")

    let today = new Date();

    let restartDate = moment(today);
    let restartTimezone = restartDate.tz('America/New_York').format('[Last restart:] [**]MMMM Do, YYYY [at] h:mm A z[**]')
    /*
        let quizUserAmount = '';
        quizUserAmount = Object.entries(client.quizzers).length;

        const sortedData = Object.entries(client.quizzers)
            .sort(([, value], [, v]) => (v.points) - (value.points))
            .reduce((acc, [k, v]) => {
                acc[k] = v;
                return acc;
            }, {});

    */
    client.drops = require("./JSON Files/quizanswer.json")

    let dropAmount = Object.entries(client.drops).length;

    let guildCountEmbed = '';
    guildCountEmbed = new MessageEmbed()
        .addField(`Bot Statistics`, `Guild Count: **${client.guilds.cache.size}**.\n${verifiedFormat}.\nAmount of Quiz Questions: **${dropAmount}**.\n${restartTimezone}.`)
    //.addField(`User Statistics`, `Number of users on the !quizme leaderboard: **${quizUserAmount}**.`)
    //let logGuild = client.guilds.cache.get(process.env.LOG_GUILD_ID)
    //let infoChannel = logGuild.channels.cache.get('661869550610022401')
    //let guildCountMsg = await infoChannel.messages.fetch('789750633077932043')



    /*guildCountMsg.edit(guildCountEmbed)

    setInterval(async () => {

        //quizUserAmount = Object.entries(client.quizzers).length;

        client.drops = require("./JSON Files/quizanswer.json")

        let dropAmount = Object.entries(client.drops).length;

        guildCountEmbed = new MessageEmbed()
            .addField(`Bot Statistics`, `Guild Count: **${client.guilds.cache.size}**.\n${verifiedFormat}.\nAmount of Quiz Questions: **${dropAmount}**.\n${restartTimezone}`)
        //.addField(`User Statistics`, `Number of users on the !quizme leaderboard: **${quizUserAmount}**.`)

        guildCountMsg.edit(guildCountEmbed)

    }, 10 * 60000);*/

    console.log('BD-1 is Up and Running!')

});

client.on('messageCreate', async (message) => {

    const currentGuild = message.guild;
    const logGuild = client.guilds.cache.get(process.env.LOG_GUILD_ID)
    const normalLogs = logGuild.channels.cache.get(process.env.NORMAL_LOGS_CHANNEL_ID)


    if (message.channel.type === 'dm') return;

    client.prefixes = require('./JSON Files/prefixes.json')

    const prefixFile = client.prefixes[message.guild.id]
    if (!prefixFile) {
        client.prefixes[message.guild.id] = {
            prefix: "!"
        }
        fs.writeFile("./JSON Files/prefixes.json", JSON.stringify(client.prefixes, null, 4), (err) => {
            if (err) throw err;
        });
    }
    const prefix = client.prefixes[message.guild.id].prefix
    let prefixTLC = prefix.toLowerCase();

    try {
        const args = message.content.slice(prefixTLC.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        //const math = require('mathjs');

        if (cmd.length === 0) return;

        let command = client.commands.get(cmd);

        if (!message.content.startsWith(prefixTLC) || message.author.bot) return;

        if (command) {

            let today = new Date()

            let currentHoursMilitary = today.getHours()
            let currentHours = '';
            let currentMinutes = today.getMinutes()

            if (currentHoursMilitary > 12) {
                let timeFrame = 'PM';
                currentHours = currentHoursMilitary - 12

                if (currentMinutes.toString().length === 1) {
                    let currentMinutesSingle = "0" + currentMinutes

                    // Hours are over 12, so it's been subtracted. Minute length is 1 character.
                    console.log(`1 [${currentHours}:${currentMinutesSingle} ${timeFrame}] ${message.author.tag} has run the command: ${message.content}`)
                } else {

                    // Hours are over 12, so it's been subtracted. Minute length is 2 characters.
                    console.log(`2 [${currentHours}:${currentMinutes} ${timeFrame}] ${message.author.tag} has run the command: ${message.content}`)
                }
            } else {
                let timeFrame = 'AM';
                if (currentMinutes.toString().length === 1) {
                    let currentMinutesSingle = "0" + currentMinutes

                    // Hours are 12 or under, so it was not subtracted. Minute length is 1 character.
                    console.log(`3 [${currentHoursMilitary}:${currentMinutesSingle} ${timeFrame}] ${message.author.tag} has run the command: ${message.content}`)
                } else {

                    // Hours are 12 or under, so it was not subtracted. Minute length is 2 characters.
                    console.log(`4 [${currentHoursMilitary}:${currentMinutes} ${timeFrame}] ${message.author.tag} has run the command: ${message.content}`)
                }
            }

            /*let cooldownTime = 3;

            if (commandCooldown.has(message.author.id)) {

                let cooldownEmbed = new MessageEmbed()
                    .setDescription(`You are on cooldown for ${cooldownTime} seconds! Vote for the bot at [this link](${process.env.TOPGG_VOTE_URL}) to disable command cooldowns for 12 hours.`)
                message.reply(cooldownEmbed)
                return;
            } else {

                dbl.hasVoted(message.author.id).then(voted => {
                    if (voted) {
                        //console.log(`Voted: ✅ ${message.author.tag}`)
                    } else {
                        //console.log(`Voted: ❌ ${message.author.tag}`)

                        //commandCooldown.add(message.author.id)
                        console.log(`Added ${message.author.tag} to command cooldown.`)
                    }
                });

                setTimeout(() => {
                    commandCooldown.delete(message.author.id)
                    console.log(`Removed ${message.author.tag} from command cooldown.`)
                }, cooldownTime * 1000);
            }*/

            function randomObject(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
            }

            let randomNumber = randomObject(1, 100)

            if (randomNumber === 1) {

                let advertiseEmbed = new MessageEmbed()
                    .setDescription(`Enjoying the bot? [Check us out on top.gg](${process.env.TOPGG_BOT_URL})! It would be greatly appreciated if you left a review or [voted](${process.env.TOPGG_VOTE_URL})!`)

                setTimeout(() => {
                    message.channel.send(advertiseEmbed)
                }, 500);
            }

            client.blacklist = require("./JSON Files/blacklist.json")

            if (client.blacklist[message.author.id]) {

                let blacklistStatus = client.blacklist[message.author.id].status

                if (blacklistStatus === true) {
                    message.reply('you are blacklisted from BD-1. DM me to appeal.')
                } else {
                    command.run(client, message, args)
                }
            } else {
                command.run(client, message, args)
            }

        }


    } catch (err) {
        console.error();
    }
});
client.on('messageCreate', async (message) => {

    const logGuild = client.guilds.cache.get(process.env.LOG_GUILD_ID)

    if (message.channel.type !== 'dm') {

        const prefix = client.prefixes[message.guild.id].prefix;
        if (!prefix) {
            client.prefixes[message.guild.id] = {
                prefix: "!"
            }
            fs.writeFile("./JSON Files/prefixes.json", JSON.stringify(client.prefixes, null, 4), (err) => {
                if (err) throw err;
            });
        }

        const mentionedMember = message.mentions.members.first()

        if (mentionedMember) {

            const deleteFilter = (reaction, user) => {
                return reaction.emoji.name === '🗑️' && !user.bot
            };


            if (message.mentions.has(process.env.BOT_ID)) {

                if (message.author.bot) return;

                let args = message.content.split(/ +/g);

                if (message.content.toLowerCase().includes('help')) {

                    let command = client.commands.get('help')

                    command.run(client, message, args)

                } else {

                    const prefixMessage = await message.reply(`my prefix in **${message.guild.name}** is: \`${prefix}\``)
                    await prefixMessage.react('🗑️')



                    prefixMessage.awaitReactions(deleteFilter, {
                            max: 1
                        })
                        .then(collected => {
                            prefixMessage.delete().catch(e => {})
                        })

                }
            }


        }


        if (message.guild.id === process.env.LOG_GUILD_ID) {


            if (message.author.bot) return;

            client.prefixes = require('./JSON Files/prefixes.json')

            const prefix = client.prefixes[message.guild.id].prefix

            if (message.channel.name.includes('ticket')) {

                const channelTopic = message.channel.topic;

                const userToSend = await client.users.fetch(channelTopic)

                if (message.content.startsWith(prefix)) return;

                userToSend.send(`**${message.author.tag}**: ${message.content}`).catch(err => {
                    message.channel.send('Could not send message to user.')
                })
            }
        }

        client.prefixes = require('./JSON Files/prefixes.json')


        // Send to channel specific

        client.setSay = require("./JSON Files/saysomething.json")

        let guildID = client.setSay[process.env.DEVELOPER_ID].guildID;
        let channelID = client.setSay[process.env.DEVELOPER_ID].channelID;

        let guildToSend = client.guilds.cache.get(guildID)
        let channelToSend = guildToSend.channels.cache.get(channelID)

        let logGuild = client.guilds.cache.get(process.env.LOG_GUILD_ID)
        let sayChannel = logGuild.channels.cache.get(process.env.SAY_CHANNEL_ID)

        if (message.channel === channelToSend) {
            if (message.author.bot) return;
            sayChannel.send(`**${message.author.tag}**: ${message.content}`)
        }


        if (message.channel.id === process.env.SAY_CHANNEL_ID && message.guild.id === process.env.LOG_GUILD_ID) {

            let guildID = client.setSay[process.env.DEVELOPER_ID].guildID;
            let channelID = client.setSay[process.env.DEVELOPER_ID].channelID;

            let guildToSend = client.guilds.cache.get(guildID)
            let channelToSend = guildToSend.channels.cache.get(channelID)

            console.log(`Guild ID: ${guildID}\nChannel ID: ${channelID}\n\n${guildToSend.name},${guildToSend.id}\n${channelToSend.name},${channelToSend.id}`)

            if (message.content.startsWith(prefix) || message.content.toLowerCase().includes('[ignore]')) return;
            channelToSend.send(`**${message.author.tag}**: ${message.content}`)
        }

    } else {

        if (message.author.bot) return;

        let ticketCheck = logGuild.channels.cache.find(chan => chan.type = 'text' && chan.topic === `${message.author.id}`)

        if (!ticketCheck) {


            let startMessage = await message.channel.send(`React with a checkmark below if you would like to open a ticket.`)
            await startMessage.react('✅')


            const confirmFilter = (reaction, user) => {
                return reaction.emoji.name === '✅' && user.id === message.author.id;
            };
            startMessage.awaitReactions(confirmFilter, {
                max: 1
            }).then(async collected => {

                let ticketCheck = logGuild.channels.cache.find(chan => chan.type = 'text' && chan.topic === `${message.author.id}`)
                if (ticketCheck) {
                    message.channel.send('Why are you trying to open another ticket?')

                    return;
                }

                let ticketChannel = await logGuild.channels.create(`${message.author.username}s-ticket`, {
                    type: 'text',
                    permissionOverwrites: [{
                            id: process.env.SUPPORT_TEAM_ROLE_ID, // Support Team
                            allow: ['READ_MESSAGE_HISTORY', 'VIEW_CHANNEL', 'SEND_MESSAGES'],
                        },
                        {
                            id: process.env.LOG_GUILD_ID, // everyone
                            deny: ['READ_MESSAGE_HISTORY', 'VIEW_CHANNEL', 'SEND_MESSAGES'],
                        }
                    ],
                    parent: process.env.TICKETS_CATEGORY_ID,
                    topic: message.author.id

                })

                await ticketChannel.send(`<@&${process.env.SUPPORT_TEAM_ROLE_ID}>, **${message.author.tag}** needs help!\n\n${message.content}`)

                /*let ryleUser = await client.users.fetch(process.env.DEVELOPER_ID)
                let ryleStatus = ryleUser.presence.status;

                let devStatus = '';

                if (ryleStatus === 'online') {
                    devStatus = '**Online**, so hopefully he can be with you soon!'
                }
                if (ryleStatus === 'idle') {
                    devStatus = 'online, but may take longer than usual because he is **Idle**'
                }
                if (ryleStatus === 'dnd') {
                    devStatus = 'online, but may take longer than usual because he is on **Do Not Disturb**'
                }
                if (ryleStatus === 'offline') {
                    devStatus = '**Offline**, so please give him time to respond.'
                }

                await message.author.send(`The developer has been notified. He is ${devStatus}.`)*/
                await message.author.send('The developer has been notified, someone will be with you as soon as possible!')

            })


        } else {
            ticketCheck.send(`**${message.author.username}**: ${message.content}`)
        }

    }



    return;

    if (message.author.bot) return console.log('bot')

    client.levels = require("./levels.json")
    const levelFile = client.levels[message.author.id];

    if (message.content) {
        console.log('message')
        if (!levelFile) {
            console.log('no level file')

            client.levels[message.author.id] = {
                level: 0,
                xp: 0,
            }
            fs.writeFile("./levels.json", JSON.stringify(client.levels, null, 4), (err) => {
                if (err) throw err;
            });
            console.log('wrote file 1')
        }
        if (levelFile) {
            console.log('level file')
            const currentLevel = client.levels[message.author.id].level;
            const currentXP = client.levels[message.author.id].xp;

            client.levels[message.author.id] = {
                xp: currentXP + 15,
                level: currentLevel
            }
            fs.writeFile("./levels.json", JSON.stringify(client.levels, null, 4), (err) => {
                if (err) throw err;
            });
            console.log('wrote file 2')
            if (currentXP > 14 && currentLevel === 0) {
                client.levels[message.author.id] = {
                    xp: currentXP,
                    level: currentLevel + 1
                }
                fs.writeFile("./levels.json", JSON.stringify(client.levels, null, 4), (err) => {
                    if (err) throw err;
                });

                message.channel.send(`${message.author} just levelled up to level ${currentLevel}!`)
            }
        }
    }
});
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;


    console.log(`Interaction in ${interaction.guild.name} by ${interaction.user.tag}`)
    await command.execute(interaction, client)

});
client.on('guildMemberAdd', async (member, guild) => {
    const {
        MessageEmbed
    } = require("discord.js")
    const welcomeGuild = client.guilds.cache.get(process.env.LOG_GUILD_ID)

    console.log('hi')
    if (member.guild.id !== welcomeGuild.id) return;
    console.log('hello')
    const welcomeChannel = welcomeGuild.channels.cache.get(process.env.WELCOME_CHANNEL_ID)

    let welcomeEmbed = new MessageEmbed()
        .setAuthor('Hello there!')
        .setDescription(`Ah, General ${member}! We've been expecting you at ${member.guild.name} for quite some time, now!\n\nPlease read the <#655317218065645590>.`)
        .setImage('https://media.giphy.com/media/Nx0rz3jtxtEre/giphy.gif')
        .setColor("#FFFFF0")

    welcomeChannel.send(welcomeEmbed)
});
client.on('guildCreate', async (guild) => {

    const guildOwnerID = guild.ownerID
    const guildOwner = await guild.members.fetch(guildOwnerID)

    guildOwner.send('Thank you for adding me to your server! My prefix is `!`, but this is customizable with the `!prefix` command.')

    const logGuild = client.guilds.cache.get(process.env.LOG_GUILD_ID)
    const normalLogs = logGuild.channels.cache.get(process.env.GUILD_JOIN_LOGS_CHANNEL_ID)

    normalLogs.send(`New Guild: ${guild.name} | Owner: ${guildOwner.user.tag}`)
});
client.on('guildDelete', async (guild) => {

    const logGuild = client.guilds.cache.get(process.env.LOG_GUILD_ID)
    const normalLogs = logGuild.channels.cache.get(process.env.GUILD_JOIN_LOGS_CHANNEL_ID)

    normalLogs.send(`Removed from Guild: ${guild.name}`)
});
client.on('messageReactionAdd', (messageReaction, user) => {

    if (messageReaction.emoji.name === '⚠️') {

        const logGuild = client.guilds.cache.get(process.env.LOG_GUILD_ID)
        const logChannel = logGuild.channels.cache.get(process.env.REPORT_LOGS_CHANNEL_ID)

        let reportEmbed = new MessageEmbed()
            .setAuthor(`New Report by ${user.tag}`, user.avatarURL)
            .setDescription(`${messageReaction.message.author.tag}: ${messageReaction.message.content}`)
            .setFooter(`Message sent in #${messageReaction.message.channel.name} | ${messageReaction.message.guild.name}`)
            .setColor('#FF0000')

        logChannel.send(reportEmbed)
    }
});
/*client.on('rateLimit', async (rateLimitInfo) => {

    const logGuild = client.guilds.cache.get(process.env.LOG_GUILD_ID)
    const normalLogs = logGuild.channels.cache.get(process.env.NORMAL_LOGS_CHANNEL_ID)

    console.log(`Rate Limit Breach!\n\nInfo: ${rateLimitInfo}\nLimit: ${rateLimitInfo.limit}\nTime Difference: ${rateLimitInfo.timeDifference}\nPath: ${rateLimitInfo.path}\nMethod: ${rateLimitInfo.method}`)
    
    console.log('\n\n\n')

    normalLogs.send(`Rate Limit Breach!\n\nInfo: ${rateLimitInfo}\nLimit: ${rateLimitInfo.limit}\nTime Difference: ${rateLimitInfo.timeDifference}\nPath: ${rateLimitInfo.path}\nMethod: ${rateLimitInfo.method}`)
})*/
client.login(process.env.DISCORD_TOKEN)