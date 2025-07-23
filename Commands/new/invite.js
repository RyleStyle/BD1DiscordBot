const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Get an invite link for the bot.'),
    execute (interaction, client) {

        const { MessageEmbed } = require("discord.js")

        interaction.reply('Invite link will be available soon! Bot is being recoded.')

        /*
        const inviteEmbed = new MessageEmbed()
        .setAuthor('BD-1 Invite')
        .setDescription('[Invite me by clicking here!](https://discord.com/oauth2/authorize?client_id=690080851769557012&permissions=3533889&scope=bot)')
        .setColor('#FFFFFF')

        message.channel.send(inviteEmbed)
        */
    }
}