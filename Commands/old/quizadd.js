const {
    MessageEmbed
} = require("discord.js");

const fs = require("fs")

module.exports = {
        name: "quizadd",
        description: "HIDDEN",
        category: "dev",
        run: async (client, message, args) => {

                client.drops = require("../../JSON Files/quizanswer.json")

                let dropAmount = Object.entries(client.drops).length;

                let newDropNumber = dropAmount + 1;
                

                let promtEmbed = new MessageEmbed()
                    .setAuthor('Confirm')
                    .setDescription(`Quiz Number: ${newDropNumber}`)

                let filter = m => m.author.id === message.author.id;
                message.channel.send(`${message.author} please provide the name of the quiz.`)
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 1 * 60000
                }).then(collected => {
                        promtEmbed.addField('Name', collected.first().content)

                        const nameOfQuiz = collected.first().content

                        // Next question.
                        message.channel.send(`${message.author} please provide the display of the quiz. `)
                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 1 * 60000
                        }).then(collected => {
                            promtEmbed.addField('Display', collected.first().content)

                            const displayOfQuiz = collected.first().content

                            // Next Question.
                            message.channel.send(`${message.author} please provide the "question" of the quiz below:\n\nWhat planet is this?\nWhat ship is this?\nWho is this?\nWhat is this vehicle called?`)
                            message.channel.awaitMessages(filter, {
                                max: 1,
                                time: 1 * 60000
                            }).then(collected => {

                                promtEmbed.addField('Question', collected.first().content)

                                const questionOfQuiz = collected.first().content;

                                message.channel.send(`${message.author} please provide the thumbnail of the quiz below. (LINK ONLY)`)
                                message.channel.awaitMessages(filter, {
                                    max: 1,
                                    time: 1 * 60000
                                }).then(async collected => {

                                    promtEmbed.addField('Thumbnail', collected.first().content)

                                    const thumbnailOfQuiz = collected.first().content;

                                    client.countdowns = require("../.././JSON Files/quizanswer.json")

                                    let promtSend = await message.reply(promtEmbed)
                                    promtSend.react('✅')
                                    promtSend.react('❌')

                                    const confirmFilter = (reaction, user) => {
                                        return reaction.emoji.name === '✅' && user.id === message.author.id;
                                    };
                                    promtSend.awaitReactions(confirmFilter, {
                                            max: 1
                                        })
                                        .then(async collected => {

                                            client.drops = require("../.././JSON Files/quizanswer.json")


                                            client.drops[newDropNumber] = {
                                                name: nameOfQuiz,
                                                display: displayOfQuiz,
                                                question: questionOfQuiz,
                                                thumbnail: thumbnailOfQuiz

                                            }
                                            fs.writeFile("./JSON Files/quizanswer.json", JSON.stringify(client.drops, null, 4), (err) => {
                                                if (err) throw err;
                                            });
                                            message.reply('added!')
                                        })

                                    const denyFilter = (reaction, user) => {
                                        return reaction.emoji.name === '❌' && user.id === message.author.id;
                                    };
                                    promtSend.awaitReactions(denyFilter, {
                                            max: 1
                                        })
                                        .then(async collected => {
                                            message.reply('cancelled.')
                                        });


                                        }).catch(err => {
                                            message.channel.send(`${message.author}, you took too long to provide a thumbnail.`)
                                            console.log(err)
                                        })


                                }).catch(err => {
                                    message.channel.send(`${message.author}, you took too long to provide a question.`)
                                    console.log(err)
                                })

                            }).catch(err => {
                                message.channel.send(`${message.author}, you took too long to provide a display.`)
                            })


                        }).catch(err => {
                            message.channel.send(`${message.author}, you took too long to provide a name.`)
                        })
                    }
                }