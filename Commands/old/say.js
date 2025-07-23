const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "say",
    description: "HIDDEN",
    category: "dev",
    run: async (client, message, args) => {

        const logGuild = client.guilds.cache.get('655316710751993868')
        const errorLog = logGuild.channels.cache.get('669683593475522600') 
        
try {
    if (message.author.id !== '406880301449478144') return message.reply("that command is only for the Devloper!")

    message.delete().catch(e => { console.log(`Cannot delete in ${message.guild.name}.`) })

    if (args[0] === 'embed') {
        const params = message.content.split(" ").slice(2);  
        var saidmessage = params.slice(0).join(" ");
        if(!saidmessage) return;
        // If I don't put a message to send, just return nothing.
    
        let embedToSend = new MessageEmbed()
        .setDescription(saidmessage)
        var sentMessage = await message.channel.send(embedToSend).catch(err => {})
    } else {
        const params = message.content.split(" ").slice(1);  
        var saidmessage = params.slice(0).join(" ");
        if(!saidmessage) return;
        // If I don't put a message to send, just return nothing.
    
        var sentMessage = await message.channel.send(saidmessage).catch(err => {})
    }

    const deleteFilter = (reaction, user) => {
        return reaction.emoji.name === '🗑️' && user.id === '406880301449478144';
    };

    sentMessage.awaitReactions(deleteFilter, {
            max: 1
        })
        .then(collected => {
            sentMessage.delete()
        })
            

} 
catch (err) {
    
var path = require('path');

var filename = path.basename(__filename);

let errorEmbed = new RichEmbed()
.setAuthor(`ERR AT: ${filename}`)
.setDescription(`\`\`\`js\n${err}\`\`\``)
.setColor("#ffa500")

errorLog.send(errorEmbed)

message.channel.send(`⚠️ There was an ERROR with this command. The Devs have been notified, and we will try to resolve this issue as fast as we can`)
    }
    }
}