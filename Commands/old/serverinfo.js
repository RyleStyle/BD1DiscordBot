module.exports = {
    name: "serverinfo",
    description: "Sends information for the server the message is sent in.",
    category: "general",
    run: async (client, message, args) => {

        const logGuild = client.guilds.cache.get('655316710751993868')
        const errorLog = logGuild.channels.cache.get('669683593475522600')
        const { MessageEmbed } = require("discord.js")

        try {

            const fs = require("fs")

            var moment = require("moment-timezone");
            var momentDurationFormatSetup = require("moment-duration-format");

            momentDurationFormatSetup(moment);
            typeof moment.duration.fn.format === "function";
            // true
            typeof moment.duration.format === "function";
            // true 

            const serverCreate = moment(message.guild.createdAt).format('LL')

            const eInfo = new MessageEmbed()
                .setAuthor(`${message.guild.name}`, message.guild.iconURL)
                .setColor("#fffff0")
                .addField("Guild ID", `${message.guild.id}`)
                .addField(`Role Count`, message.guild.roles.cache.size, true)
                .addField(`Channel Count`, message.guild.channels.cache.size, true)
                .addField("Member Count", `${message.guild.memberCount}`)
                .addField("Server Created At", serverCreate, true)
                .addField(`Owner | Owner ID`, `${message.guild.owner.user.tag} | ${message.guild.ownerID}`)
                .addField(`Region`, message.guild.region, true)
                .setTimestamp(message.createdAt)

            message.channel.send(eInfo).catch(err => {})
        } catch (err) {

            var path = require('path');

            var filename = path.basename(__filename);

            let errorEmbed = new MessageEmbed()
                .setAuthor(`ERR AT: ${filename}`)
                .setDescription(`\`\`\`js\n${err}\`\`\``)
                .setColor("#fffff0")

            errorLog.send(errorEmbed)

            message.channel.send(`⚠️ There was an ERROR with this command. The Devs have been notified, and we will try to resolve this issue as fast as we can`)
        }



    }
}