const {
    MessageEmbed
} = require("discord.js")
const {
    SlashCommandBuilder
} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Inclues basic user info (and quiz info)')
        .addUserOption(option =>
            option
            .setName('target')
            .setDescription('Target user')
        ),
    async execute(interaction, client) {

        let target = interaction.options.getMember('target')

        let moment = require("moment-timezone");
        let momentDurationFormatSetup = require("moment-duration-format");

        momentDurationFormatSetup(moment);
        typeof moment.duration.fn.format === "function";
        // true
        typeof moment.duration.format === "function";
        // true 

        const userCreate = moment(target.user.createdAt).fromNow()
        const joinedServer = moment(target.joinedAt).format('LL')

        let roleMap = target.roles.cache.filter(r => r.id !== interaction.guild.id).map(r => r)
        const stringLength = roleMap.length;

        console.log(stringLength)

        if (stringLength === 0) {
            roleMap = "No roles to show."
        }

        if (stringLength > 15) {

            let roleString = `${roleMap[0]}, `

            for (let i = 1; i < 15; i++) {

                roleString = roleString + `${roleMap[i]}`
            }

            // Add the end
            roleString = roleString + `.... and ${stringLength - 15} more role(s)...`

            roleMap = roleString

        }
        let userEmbed = new MessageEmbed()
            .setAuthor({
                name: `${target.displayName}'s Info:`
            })
            .setDescription(`Avatar in Corner`)
            .setThumbnail(target.user.displayAvatarURL)
            .addField("User ID", target.id)
            .addField("Account Created", userCreate, true)
            .addField("Join Date", joinedServer, true)
            .addField(`Roles`, roleMap.toString())
            .setColor("#fffff0")

        interaction.reply({
            embeds: [userEmbed]
        })
    }
}