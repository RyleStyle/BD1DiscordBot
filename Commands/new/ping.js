const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping the bot.'),
    async execute(interaction, client) {

        interaction.reply("Pong!")
        
    }
}