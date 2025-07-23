const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('quizme')
    .setDescription('Star Wars character quiz.'),
    async execute (interaction, client) {


        interaction.reply("Command is still in development. I need the messages intent before I can get to work on this.")
    }
}