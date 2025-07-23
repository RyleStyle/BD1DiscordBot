const fs = require("fs")

module.exports = {
    name: "setsay",
    description: "HIDDEN",
    category: "dev",
    run: async (client, message, args) => {


        client.setSay = require("../.././JSON Files/saysomething.json")

        const logGuild = client.guilds.cache.get('655316710751993868')
        const errorLog = logGuild.channels.cache.get('669683593475522600')
        const guildID = args[0]
        const channelID = args[1]

        const guildToSend = client.guilds.cache.get(guildID)
        const channelToSend = guildToSend.channels.cache.get(channelID)

        client.setSay[message.author.id] = {
            guildID: guildID,
            guildName: guildToSend.name,
            channelID: channelID,
            channelName: channelToSend.name
        }
        fs.writeFile("./JSON Files/saysomething.json", JSON.stringify(client.setSay, null, 4), (err) => {
            if (err) throw err;
        });
        message.channel.send(`Set! \`${guildToSend.name}, ${channelToSend.name}\``)



    }
}