const {
    SlashCommandBuilder
} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('managecountdown')
        .setDescription('Add a countdown for the bot. (dev only)')
        .addSubcommand(subcommand =>
            subcommand
            .setName('add')
            .setDescription('Add a countdown')
            .addStringOption(option =>
                option
                .setName('content')
                .setDescription('What is being released?')
                .setRequired(true)
            )
            .addStringOption(option =>
                option
                .setName('time')
                .setDescription('What is being released?')
                .setRequired(true)
            )
            .addStringOption(option =>
                option
                .setName('category')
                .setDescription('What category does this fall under?')
                .setRequired(true)
                .addChoice('Films', 'films')
                .addChoice('Games', 'games')
                .addChoice('Books', 'games')
                .addChoice('Events', 'events')
            )
        ),
    async execute(interaction, client) {


        const countdownContent = interaction.options.getString('content')
        const countdownTime = interaction.options.getString('time')
        const countdownCategory = interaction.options.getString('category')
        
        let addedEmbed = new MessageEmbed()
        .setAuthor({ name: "New Countdown Added", iconURL: interaction.user.displayAvatarURL()})
        .setDescription(`Added by ${interaction.user}`)
        .addField(`Content`, countdownContent)
        .addField(`Time`, countdownTime)
        .addField(`Category`, countdownCategory)
        interaction.reply({ embeds: [addedEmbed] })


    }
}