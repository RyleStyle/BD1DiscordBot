module.exports = {
    name: "whitelist",
    description: "HIDDEN",
    category: "dev",
    run: async (client, message, args) => {

        if (message.author.id !== '406880301449478144') return;

        client.whitelistedGuilds = require("../.././whitelisted.json")


        const fs = require("fs")
        console.log(args[1])

        if (!args[0]) return console.log('?')

        if (args[1] === 'true') {

            client.whitelistedGuilds[args[0]] = {
                whitelisted: true
            }
            fs.writeFile("./whitelisted.json", JSON.stringify(client.whitelistedGuilds, null, 4), (err) => {
                if (err) throw err;
            });
            fs.writeFile("./backup.json", JSON.stringify(client.whitelistedGuilds, null, 4), (err) => {
                if (err) throw err;
            })
            message.channel.send(`The guild with the ID: \`${args[0]}\` has been whitelisted.`)
        }
        if (args[1] === 'false') {
            client.whitelistedGuilds[args[0]] = {
                whitelisted: false
            }
            fs.writeFile("./whitelisted.json", JSON.stringify(client.whitelistedGuilds, null, 4), (err) => {
                if (err) throw err;
            });
            fs.writeFile("./backup.json", JSON.stringify(client.whitelistedGuilds, null, 4), (err) => {
                if (err) throw err;
            })
            message.channel.send(`The guild with the ID: \`${args[0]}\` has been blacklisted.`)
        }

        message.channel.send('Guild whitelisted.')
    }
}