module.exports = {
    name: "eval",
    description: "HIDDEN",
    category: "dev",
    run: async (client, message, args) => {

      const logGuild = client.guilds.cache.get('655316710751993868')
      const errorLog = logGuild.channels.cache.get('669683593475522600') 
      const normalLogs = logGuild.channels.cache.get('679175605018820638')

      const { MessageEmbed } = require('discord.js')

      const ryleID = '406880301449478144';

            try {

                function clean(text) {
                    if (typeof(text) === "string")
                      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                    else
                        return text;
                  }

                if (message.author.id !== ryleID) return normalLogs.send(`${message.author.tag} (${message.author.id}) is trying to use EVAL!`)
               

                const code = args.join(" ");

                if (!code) {
                  message.channel.send(`What code to you want me to process?`)
                  return;
                }

                let evaled = eval(code);
           
                if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);
           

                let evalEmbed = new MessageEmbed()
                .setAuthor(`Eval`)
                .setDescription(`Input: \`\`\`js\n${code}\`\`\`\n\nOutput:\`\`\`js\n${clean(evaled)}\`\`\``)
                .setColor("#FFFFF0")
                message.channel.send(evalEmbed)
                
            }
            catch (err) {
                let evalErr = new MessageEmbed()
                .setAuthor(`Err`)
                .setDescription(err)
                .setColor("#FFFFF0")
                message.channel.send(evalErr)
            }
    }
}