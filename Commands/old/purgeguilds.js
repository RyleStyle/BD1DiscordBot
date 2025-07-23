module.exports = {
    name: "purgeguilds",
    description: "HIDDEN",
    category: "dev",
    run: async (client, message, args) => {

        return;

        if (message.author.id !== '406880301449478144') return;
        
        client.whitelistedGuilds = require("../.././whitelisted.json")

        const { MessageEmbed } = require("discord.js")

        let leaveEmbed = new MessageEmbed()

        for (let [key, value] of Object.entries(client.whitelistedGuilds)) {

            if (value.whitelisted === false) {
                console.log(key)
                let guildToLeave = client.guilds.cache.get(`${key}`)
                console.log(guildToLeave)
                if (!guildToLeave) return;
                leaveEmbed.setDescription(`Your guild, ${guildToLeave}, is not perrmitted to have BD-1. This means the bot will have to leave the server now. If you believe this is an error please contact Ryle#5388 [here](https://discord.gg/nN674du).`)
                guildToLeave.owner.send(leaveEmbed)

                await guildToLeave.leave();
                console.log(`Leaving ${guildToLeave}.`)
            }
            
        }
    }
}