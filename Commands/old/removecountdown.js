module.exports = {
    name: "removecountdown",
    description: "HIDDEN",
    category: "dev",
    run: async (client, message, args) => {

        if (message.author.id === '406880301449478144') {

            const { MessageEmbed } = require("discord.js")
            const fs = require("fs")

            message.delete().catch(e => { console.log(`Cannot delete in ${message.guild.name}.`) })

            const params = message.content.split(" ").slice(1);

            let toRemove = params.slice(0).join(" ")

            if (!toRemove) return message.channel.send('What key do you want me to remove?')

                client.countdowns = require("../.././JSON Files/savedcountdowns.json")
                const releaseDate = client.countdowns[toRemove].release
                const categoryOf = client.countdowns[toRemove].category
                const addedBy = client.countdowns[toRemove].addedByID

                client.countdowns[toRemove] = { 
                    "release": releaseDate,
                    "category": categoryOf,
                    "enabled": false,
                    "addedByID": addedBy
                }

                const fileContents = Object.assign({}, client.countdowns)
                delete fileContents[toRemove]

                fs.writeFile("./JSON Files/savedcountdowns.json", JSON.stringify(fileContents, null, 4,), (err) => {
                    if (err) message.reply('err.');
                });

                message.channel.send('Countdown removed!')
            }
        }

    }