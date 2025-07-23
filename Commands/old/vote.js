const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "vote",
    description: "Get a link to vote for the bot on [top.gg](https://top.gg). Voting removes your command cooldown for 12 hours.",
    detailed: "You can renew your vote once every 12 hours. This means, that technically, you can completely disable your command cooldown forever by voting over and over.",
    category: "general",
    run: async (client, message, args) => {

        let voteEmbed = new MessageEmbed()
        .setDescription('[Click here to vote for BD-1!](https://top.gg/bot/690080851769557012/vote)')

        message.reply(voteEmbed)
    }
}