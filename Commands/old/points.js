module.exports = {
    name: "points",
    description: "See the points of yourself or another user.",
    category: "general",
    run: async (client, message, args) =>{

        client.prefix = require("../../JSON Files/prefixes.json")
        const prefix = client.prefix[message.guild.id].prefix;

        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        client.dropPoints = require("../../JSON Files/droppoints.json")


        if (!mentionedMember) {

            let playerPointFile = client.dropPoints[message.author.id]
            if (!playerPointFile) {
                message.reply(`you don\'t have any points! Get started with ${prefix}quizme`)
            } else {
                let playerPoints = client.dropPoints[message.author.id].points;
                
                message.reply(`you have **${playerPoints}** points.`)
            }

        } else {
            
            playerPointFile = client.dropPoints[mentionedMember.id]
            if (!playerPointFile) {
                message.reply(`that user doesn\'t have any points!`)
            } else {
                playerPoints = client.dropPoints[mentionedMember.id].points;
                
                message.reply(`${mentionedMember.user.tag} has **${playerPoints}** points.`)
            }
        }



    }
}