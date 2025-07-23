module.exports = {
    name: "suggestcountdown",
    description: "Suggest a countdown for the `countdown` command! The bot will send messages for you to respond to. All entries go directly to the Developer.",
    detailed: "Once you send the initial message, the bot will continue to ask a few questions about your countdown suggestion. Please answer them correctly! Spamming this command may result in a bot blacklist for some time.",
    category: "general",
    run: async (client, message, args) => {

        const {
            MessageEmbed
        } = require("discord.js")

        const fs = require("fs")

        const slowmode = message.channel.rateLimitPerUser;

        const logGuild = client.guilds.cache.get('655316710751993868')
        const logChannel = logGuild.channels.cache.get('679175605018820638')

        const suggestionEmbed = new MessageEmbed()
            .setAuthor('New Countdown Suggestion!')
            .setDescription(`${message.author} | ${message.author.id}`)
            .setTimestamp(message.createdAt)
            .setColor("#fffff0")

        const suggestionSubmitted = new MessageEmbed()
            .setAuthor('Suggestion Submitted!')
            .setDescription('Your suggestion has been received by the Developer.')
            .setFooter('Thank you for your contribution!')
            .setColor("#fffff0")
        
        const logEmbed = new MessageEmbed()
            .setAuthor('A Countdown has been added!')
            .setDescription(`${message.author.tag} | ${message.author.id}`)
            .setFooter(message.guild.name)
            .setColor("#fffff0")

        if (slowmode > 1) {





            message.reply('slowmode is enabled in this channel. Continuing command in your DMs!')

            let filter = m => m.author.id === message.author.id;

            const dmChannel = await message.author.createDM()

            message.author.send(`Please provide the date of release below. Format: \`YYYY-MM-DD\`.`).catch(err => message.reply('oh no! I cannot message you because your DMs aren\'t on.'))
            message.author.dmChannel.awaitMessages(filter, {
                max: 1,
                time: 1 * 60000
            }).then(collected => {

                const dateOfCountdown = collected.first().content
                suggestionEmbed.addField('Date', collected.first().content)
                suggestionSubmitted.addField('Date', collected.first().content)
                logEmbed.addField('Date', collected.first().content)

                // Next question.
                message.author.send(`Please provide the category of the countdown below. Categories: \`films\`, \`games\`, \`books\`, \`events\`. If you would like a category added please provide it.`)
                message.author.dmChannel.awaitMessages(filter, {
                    max: 1,
                    time: 1 * 60000
                }).then(collected => {

                    const categoryOfCountdown = collected.first().content
                    suggestionEmbed.addField('Category', collected.first().content)
                    suggestionSubmitted.addField('Category', collected.first().content)
                    logEmbed.addField('Category', collected.first().content)

                    // Next Question.
                    message.author.send(`Please provide the name of the countdown below.`)
                    message.author.dmChannel.awaitMessages(filter, {
                        max: 1,
                        time: 1 * 60000
                    }).then(async collected => {

                        const nameOfCountdown = collected.first().content
                        suggestionEmbed.addField('Name of Countdown', collected.first().content)
                        suggestionSubmitted.addField('Name of Countdown', collected.first().content)
                        logEmbed.addField('Category', collected.first().content)



                        const confirmMessage = await message.author.send(`Please confirm that you would like to add this countdown.\n\nName: ${nameOfCountdown}\nCategory: ${categoryOfCountdown}\nDate: ${dateOfCountdown}`)
                        await confirmMessage.react('✅')
                        await confirmMessage.react('❌')



                        const confirmFilter = (reaction, user) => {
                            return reaction.emoji.name === '✅' && user.id === message.author.id;
                        };
                        confirmMessage.awaitReactions(confirmFilter, {
                                max: 1
                            })
                            .then(async collected => {



                                const ryleUser = client.users.cache.get('406880301449478144')
                                const sentMessage = await ryleUser.send(suggestionEmbed)
                                await sentMessage.react('✅')
                                await sentMessage.react('🔨')
                                await sentMessage.react('❌')

                                // ACCEPT

                                const acceptFilter = (reaction, user) => {
                                    return reaction.emoji.name === '✅' && user.id === '406880301449478144';
                                };

                                sentMessage.awaitReactions(acceptFilter, {
                                        max: 1
                                    })
                                    .then(collected => {
                                        console.log(`Countdown Accepted, ${nameOfCountdown}, ${categoryOfCountdown}, ${dateOfCountdown}`)

                                        ryleUser.send(`Countdown (${nameOfCountdown}) accepted.`)
                                        message.author.send(`Your countdown, ${nameOfCountdown}, has been denied.`)

                                        client.countdowns = require("../../savedcountdowns.json")

                                        client.countdowns[nameOfCountdown] = {
                                            release: dateOfCountdown,
                                            category: categoryOfCountdown,
                                            enabled: true,
                                            addedByID: message.author.id

                                        }
                                        fs.writeFile("./savedcountdowns.json", JSON.stringify(client.countdowns, null, 4), (err) => {
                                            if (err) throw err;
                                        });
                                    })

                                // HOLD

                                const changeFilter = (reaction, user) => {
                                    return reaction.emoji.name === '🔨' && user.id === '406880301449478144';
                                };

                                sentMessage.awaitReactions(changeFilter, {
                                        max: 1
                                    })
                                    .then(async collected => {
                                        message.author.send(`Your countdown, ${nameOfCountdown}, has been accepted. Some variables are being adjusted.`)
                                    })

                                // DENY

                                const denyFilter = (reaction, user) => {
                                    return reaction.emoji.name === '❌' && user.id === '406880301449478144';
                                };

                                sentMessage.awaitReactions(denyFilter, {
                                        max: 1
                                    })
                                    .then(collected => {
                                        console.log(`Countdown Denied: ${nameOfCountdown}, ${categoryOfCountdown}, ${dateOfCountdown} | ${message.author.tag} ${message.author.id}`)

                                        ryleUser.send(`Countdown (${nameOfCountdown}) denied.`)
                                        message.author.send(`Your countdown, ${nameOfCountdown}, has been denied.`)
                                    })

                                message.author.send(suggestionSubmitted)

                            })

                        const cancelFilter = (reaction, user) => {
                            return reaction.emoji.name === '❌' && user.id === message.author.id;
                        };

                        confirmMessage.awaitReactions(cancelFilter, {
                                max: 1
                            })
                            .then(collected => {
                                message.author.send('Suggestion cancelled.')
                            })



                    }).catch(err => {
                        message.author.send(`You took too long to provide a name.`)
                    })

                }).catch(err => {
                    message.author.send(`You took too long to provide a category.`)
                })


            }).catch(err => {
                message.author.send(`You took too long to provide a date.`)
            })





        } else {





            let filter = m => m.author.id === message.author.id;
            message.reply(`please provide the date of release below. Format: \`YYYY-MM-DD\`.`)
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 1 * 60000
            }).then(collected => {

                const dateOfCountdown = collected.first().content
                suggestionEmbed.addField('Date', collected.first().content)
                suggestionSubmitted.addField('Date', collected.first().content)

                // Next question.
                message.reply(`please provide the category of the countdown below. Categories: \`films\`, \`games\`, \`books\`. If you would like a category added please provide it.`)
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 1 * 60000
                }).then(collected => {

                    const categoryOfCountdown = collected.first().content
                    suggestionEmbed.addField('Category', collected.first().content)
                    suggestionSubmitted.addField('Category', collected.first().content)

                    // Next Question.
                    message.reply(`please provide the name of the countdown below.`)
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 1 * 60000
                    }).then(async collected => {

                        const nameOfCountdown = collected.first().content
                        suggestionEmbed.addField('Name of Countdown', collected.first().content)
                        suggestionSubmitted.addField('Name of Countdown', collected.first().content)



                        const confirmMessage = await message.reply(`please confirm that you would like to add this countdown.\n\nName: ${nameOfCountdown}\nCategory: ${categoryOfCountdown}\nDate: ${dateOfCountdown}`)
                        await confirmMessage.react('✅')
                        await confirmMessage.react('❌')



                        const confirmFilter = (reaction, user) => {
                            return reaction.emoji.name === '✅' && user.id === message.author.id;
                        };
                        confirmMessage.awaitReactions(confirmFilter, {
                                max: 1
                            })
                            .then(async collected => {



                                const ryleUser = client.users.cache.get('406880301449478144')
                                const sentMessage = await ryleUser.send(suggestionEmbed)
                                await sentMessage.react('✅')
                                await sentMessage.react('🔨')
                                await sentMessage.react('❌')

                                // ACCEPT

                                const acceptFilter = (reaction, user) => {
                                    return reaction.emoji.name === '✅' && user.id === '406880301449478144';
                                };

                                sentMessage.awaitReactions(acceptFilter, {
                                        max: 1
                                    })
                                    .then(collected => {
                                        console.log(`Countdown Accepted, ${nameOfCountdown}, ${categoryOfCountdown}, ${dateOfCountdown}`)

                                        ryleUser.send(`Countdown (${nameOfCountdown}) accepted.`)
                                        message.author.send(`Your countdown (${nameOfCountdown}) suggestion has been accepted.`)
                                        logChannel.send(logEmbed)

                                        client.countdowns = require("../.././JSON Files/savedcountdowns.json")

                                        client.countdowns[nameOfCountdown] = {
                                            release: dateOfCountdown,
                                            category: categoryOfCountdown,
                                            enabled: true,
                                            addedByID: message.author.id

                                        }
                                        fs.writeFile("./JSON Files/savedcountdowns.json", JSON.stringify(client.countdowns, null, 4), (err) => {
                                            if (err) throw err;
                                        });
                                    })

                                // HOLD

                                const changeFilter = (reaction, user) => {
                                    return reaction.emoji.name === '🔨' && user.id === '406880301449478144';
                                };

                                sentMessage.awaitReactions(changeFilter, {
                                        max: 1
                                    })
                                    .then(collected => {
                                        console.log(`Countdown Accepted (changes being made): ${nameOfCountdown}, ${categoryOfCountdown}, ${dateOfCountdown} | ${message.author.tag} ${message.author.id}`)

                                        ryleUser.send(`Countdown (${nameOfCountdown}) accepted (changes being made).`)
                                        message.author.send(`Your countdown (${nameOfCountdown}) suggestion has been accepted, but some variables are being adjusted.`)
                                    })

                                // DENY

                                const denyFilter = (reaction, user) => {
                                    return reaction.emoji.name === '❌' && user.id === '406880301449478144';
                                };

                                sentMessage.awaitReactions(denyFilter, {
                                        max: 1
                                    })
                                    .then(collected => {
                                        console.log(`Countdown Denied: ${nameOfCountdown}, ${categoryOfCountdown}, ${dateOfCountdown} | ${message.author.tag} ${message.author.id}`)

                                        ryleUser.send(`Countdown (${nameOfCountdown}) denied.`)
                                        message.author.send(`Your countdown (${nameOfCountdown}) suggestion has been denied.`)
                                    })

                                message.reply(suggestionSubmitted)

                            })

                        const cancelFilter = (reaction, user) => {
                            return reaction.emoji.name === '❌' && user.id === message.author.id;
                        };

                        confirmMessage.awaitReactions(cancelFilter, {
                                max: 1
                            })
                            .then(collected => {
                                message.reply('Suggestion cancelled.')
                            })



                    }).catch(err => {
                        message.reply(`you took too long to provide a name.`)
                    })

                }).catch(err => {
                    message.reply(`you took too long to provide a category.`)
                })


            }).catch(err => {
                message.reply(`you took too long to provide a date.`)
            })






        }
    }
}