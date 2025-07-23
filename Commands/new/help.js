const {
    SlashCommandBuilder
} = require("@discordjs/builders")
const {
    IntegrationExpireBehavior
} = require("discord-api-types/v10")
const {
    MessageEmbed,
    Collection
} = require("discord.js")
const {
    fs
} = require("fs")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Help command.'),
    async execute(interaction) {


        const {
            readdirSync
        } = require("fs")


        /*
        Main Commands
        */

        const commandFiles = readdirSync("./Commands/new").filter(file => file.endsWith(".js"))

        let mainEmbed = new MessageEmbed()
            .setAuthor({
                name: "Main Commands",
                iconURL: interaction.member.displayAvatarURL()
            })
            .setDescription(`[Support Server](https://discord.gg/TyeBdYGKss)`)
            .setColor("#228B22")

        for (let file of commandFiles) {
            const command = require(`../../Commands/new/${file}`);

            console.log(command.data.name)

            mainEmbed.addField(`/${command.data.name}`, command.data.description)

        }
        await interaction.reply({
            embeds: [mainEmbed],
            ephemeral: false
        })




        /*
        Dev Commands
        */

        /*
        if (interaction.user.id === '406880301449478144') {

            const devFiles = readdirSync("./Commands/old").filter(file => file.endsWith(".js"))

            let devEmbed = new MessageEmbed()
                .setAuthor({
                    name: "Old Commands",
                    iconURL: interaction.member.displayAvatarURL()
                })
                .setColor("#228B22")

            for (let file of devFiles) {
                const command = require(`../../Commands/old/${file}`);

                console.log(command.data.name)

                devEmbed.addField(`/${command.data.name}`, command.data.description)

            }
            await interaction.followUp({
                embeds: [devEmbed],
                ephemeral: true
            })
            
        }
        */
    }

}