module.exports = {
    name: 'test',
    description: "HIDDEN",
    category: 'dev',
    run: async (client, message, args) => {
        const sentMessage = await message.reply('pick a channel to send the embed to!');
        const filter = m => !m.author.bot
        const collector = sentMessage.channel.createMessageCollector(filter, { max: 1 });

        collector.on('collect', m =>{
            var channelId = m.content.slice(2);
            channelId = channelId.slice(0, channelId.length - 1);
            var channel = message.client.channels.cache.get(channelId);

            if(!channel){
                return message.reply('that channel doesn\'t exist!');
            }
        });

        collector.on('end', async(collected) =>{
            const secondSentMessage = await message.reply('choose a message to send');
            const secondFilter = m => m.author.id === message.author
            const secondCollector = secondSentMessage.channel.createMessageCollector(secondFilter, { max: 1 });
            
            secondCollector.on('collect', m => {
                var msg = m.content
                collector.stop(msg)
                console.log('stopped')
            });
            
            secondCollector.on('end', async (collected, reason) =>{
                console.log('end')
                if (reason) {
                    message.channel.send(reason)
                } else {
                    console.log('no msg.')
                }
            });
        });
    }
}