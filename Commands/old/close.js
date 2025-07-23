module.exports = {
    name: "close",
    description: "HIDDEN",
    category: "dev",
    run: async (client, message, args) => {
        if (message.guild.channels.cache.find(channel => channel.name.includes('ticket'))) {

            const userID = message.channel.topic;
            const userToSend = client.users.cache.get(userID)

            if (!userToSend) {
                message.channel.send('Could not send message to user.')
            } else {

            userToSend.send('Your support ticket has been **closed**. To open another, simply **send another message**!').catch(e => { message.channel.send('Could not send message to user.')})

            }

            message.channel.send('Closing...')
            setTimeout(async () => {
                await message.channel.delete()
            }, 3000);

        }
    }
}