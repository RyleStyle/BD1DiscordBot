module.exports = {
    name: "setstatus",
    description: "HIDDEN",
    category: "dev",
    run: async (client, message, args) => {

        if (message.author.id !== '406880301449478144') return;

        message.delete().catch(e => { console.log(`Cannot delete in ${message.guild.name}.`) })

        const params = message.content.split(" ").slice(1);

        let toSet = params.slice(1).join(" ")

        client.user.setActivity({
            name: toSet,
            type: args[0].toUpperCase(),
            url: 'https://www.reddit.com/r/StarWars/'
        })
    }
}