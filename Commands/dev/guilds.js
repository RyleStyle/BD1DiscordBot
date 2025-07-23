const {
    SlashCommandBuilder
} = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guilds')
        .setDescription('Dev Only'),
        async execute(interaction, client) {

        if (interaction.user.id !== '406880301449478144') return;

        let guildAmount = client.guilds.cache.size;

        let guildSort = client.guilds.cache.sort((a, b) => b.members.cache.filter(m => !m.user.bot).size - a.members.cache.filter(m => !m.user.bot).size)
        console.log(guildSort)
        let guildMap = guildSort.map(g => `\`${g.id}\`: \`${g.members.cache.filter(m => !m.user.bot).size}\`\n`)

        let embed = new MessageEmbed()
        .setDescription(`Guild Count: **${guildAmount}**\n\n${guildMap}`)
        interaction.reply({ embeds: [embed] })

    }
}