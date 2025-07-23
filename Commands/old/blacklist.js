module.exports = {
    name: "blacklist",
    description: "HIDDEN",
    category: "dev",
    run: async (client, message, args) => {

        const fs = require("fs")

        client.blacklist = require("../.././JSON Files/blacklist.json")
        client.config = require("../.././config.json")

        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const trueFalse = args[1]
        const params = message.content.split(" ").slice(3);  
        var reasonToBlacklist = params.join(" ");

        console.log(reasonToBlacklist)





        if (message.author.id !== '406880301449478144') return;

        if (!mentionedMember) {


            message.reply('please supply a member.')


        } else {

            if (trueFalse) {


                if (trueFalse === 'true') {


                    client.blacklist[mentionedMember.id] = {
                        status: true,
                        userTag: mentionedMember.user.tag,
                        userID: mentionedMember.id,
                        reason: reasonToBlacklist
                    }
                    fs.writeFile("./JSON Files/blacklist.json", JSON.stringify(client.blacklist, null, 4), (err) => {
                        if (err) throw err;
                    });
                    
                    message.reply(`${mentionedMember.user.tag} is now blacklisted.`)


                }


                if (trueFalse === 'false') {


                    client.blacklist[mentionedMember.id] = {
                        status: false,
                        userTag: mentionedMember.user.tag,
                        userID: mentionedMember.id
                    }
                    fs.writeFile("./JSON Files/blacklist.json", JSON.stringify(client.blacklist, null, 4), (err) => {
                        if (err) throw err;
                    });
                    
                    message.reply(`${mentionedMember.user.tag} is no longer blacklisted.`)


                }


                if (trueFalse !== 'true' && trueFalse !== 'false') {
                    message.reply('invalid.')
                }


            } else {


                const blacklistCheck = client.blacklist[mentionedMember.id]
                if (!blacklistCheck) {
                    message.reply('that user does not have any saved data.')


                } else {


                    const blacklistStatus = client.blacklist[mentionedMember.id].status;
                    const reasonBlacklisted = client.blacklist[mentionedMember.id].reason;

                    message.reply(`${mentionedMember.user.tag}'s blacklist status: ${blacklistStatus}\n**Reason**: \`${reasonBlacklisted}\``)


                }
            }
        }
    }
}