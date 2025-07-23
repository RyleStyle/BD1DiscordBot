const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "leaderboard",
    description: "Sends an embed with a leaderboard for the `quizme` command.",
    category: "general",
    run: async (client, message, args) => {

        client.dropPoints = require("../.././JSON Files/droppoints.json")

        const sortedData = Object.entries(client.dropPoints)
            .sort(([, value], [, v]) => (v.points) - (value.points))
            .reduce((acc, [k, v]) => {
                acc[k] = v;
                return acc;
            }
            , {});

        let leaderboardEmbed = new MessageEmbed()
            .setAuthor('Leaderboards')
            .setDescription('Points are gathered from the `quizme` command.')

        let limit = 10

        for (let i = 0, entries = Object.entries(sortedData); i < limit; i++) {
            const [key, value] = entries[i];

            let userFetch = await client.users.fetch(key)

            leaderboardEmbed.addField(`${userFetch.tag}`, `${value.points} points.`)
        }
        message.channel.send(leaderboardEmbed)


    }
}