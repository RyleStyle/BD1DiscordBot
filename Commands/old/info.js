const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "info",
    description: "Sends an embed with general bot info.",
    category: "general",
    run: async (client, message, args) => {

        const fs = require("fs")

        /*
        client.dropPoints = require("../.././JSON Files/droppoints.json")

        const sortedData = Object.entries(client.dropPoints)
            .sort(([, value], [, v]) => (v.points) - (value.points))
            .reduce((acc, [k, v]) => {
                acc[k] = v;
                return acc;
            }, {});
        */


        const serverCount = client.guilds.cache.size;

        let devUser = client.users.cache.get('406880301449478144')
        let developerTag = devUser.tag;

        const infoEmbed = new MessageEmbed()
            .setAuthor('Bot Info')
            .setDescription('The bot invite can be found [here](https://top.gg/bot/690080851769557012).\nThe support server invite can be found [here](https://discord.gg/BPFNCRP2Wj).\nYou can also **DM me if you have questions**, and someone will be able to respond as soon as possible.')
            .addField('Servers I\'m In', serverCount)
            .addField('Developer', developerTag)
            .addField('Verified', 'Yes! Verified on: 12/17/2020')
            .setColor('#FFFFF0')




        /*let limit = 1

        for (let i = 0, entries = Object.entries(sortedData); i < limit; i++) {
            const [key, value] = entries[i];

            let userFetch = await client.users.fetch(key)

            infoEmbed.addField(`Top Quiz Player`, `**${userFetch.tag}** with **${value.points}** points.`, true)
        }*/

        message.reply(infoEmbed)
    }

}