module.exports = {
    name: "prefix",
    description: "Used to set the bot prefix for the server.\n__Permission required: ADMINISTRATOR.__",
    category: "config",
    run: async (client, message, args) => {

        const fs = require("fs")

        client.prefixes = require('../.././JSON Files/prefixes.json')

        const setPrefix = args[0];

        if (setPrefix) {

            if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('this command is only for people with the `ADMINISTRATOR` permission!')


        client.prefixes[message.guild.id] = {
            prefix: setPrefix
        }
        fs.writeFile("./JSON Files/prefixes.json", JSON.stringify(client.prefixes, null, 4), (err) => {
            if (err) throw err;
        });

        message.reply(`Prefix changed to: \`${setPrefix}\``)   
        }
    }
}