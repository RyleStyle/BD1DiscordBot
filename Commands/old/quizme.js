const {
    MessageEmbed,
    Collector
} = require("discord.js");
const fs = require("fs")

const finishQuiz = new Set();
const cmdCooldown = new Set();

module.exports = {
    name: "quizme",
    description: "Sends a photo of a Star Wars planet, vehicle, character, etc. Guess the right answer for points!",
    category: "general",
    run: async (client, message, args) => {

        if (cmdCooldown.has(message.author.id) && !finishQuiz.has(message.author.id)) {
            message.reply('slow down! Quizzes have a 25 second cooldown.')
            return;
        } else {
            cmdCooldown.add(message.author.id)
            console.log(`Added ${message.author.tag} to cooldown.`)
                setTimeout(() => {
                    cmdCooldown.delete(message.author.id)
                    console.log(`Removed ${message.author.tag} from cooldown.`)
                }, 25 * 1000); // # times 1 second
        }

       // try {
            if (message.author.bot) return;

                if (finishQuiz.has(message.author.id)) {

                    message.reply("finish your current quiz first!");
                    return;
                } else {
                    finishQuiz.add(message.author.id)
                }

            client.drops = require("../../JSON Files/quizanswer.json")
            //client.dropPoints = require("../../JSON Files/droppoints.json")

            let dropAmount = Object.entries(client.drops).length

            if (message.author.id === '406880301449478144' && args[0]) {

                if (args[0] > dropAmount) {
                    message.reply('that does not exist.')
                    finishQuiz.delete(message.author.id)
                }
                let quizSubject = args[0]

                let quizEmbed = new MessageEmbed()
                    .setAuthor('Quiz')
                    .setDescription(client.drops[quizSubject].question)
                    .setImage(client.drops[quizSubject].thumbnail)
                    .setFooter('Any errors? DM me!')
                let filter = '';

                if (message.channel.rateLimitPerUser === 0) {
                    message.channel.send(quizEmbed)
                    finishQuiz.add(message.author.id);
                    filter = m => m.channel.id === message.channel.id && !message.author.bot;
                } else {
                    quizEmbed.addField('Note', 'Slowmode is enabled in this channel! Stealing other people\'s quizzes is not possible.')
                    message.reply(quizEmbed)
                    finishQuiz.add(message.author.id);
                    filter = m => m.channel.id === message.channel.id && !message.author.bot && m.author.id === message.author.id;
                }
                const collector = message.channel.createMessageCollector(filter, {
                    time: 1 * 15000
                })


                collector.on('collect', m => {

                    if (m.author.bot) return;

                    if (m.content.toLowerCase().includes(client.drops[quizSubject].name)) {
                        collector.stop('Right answer given.')

                        let playerPoints = client.dropPoints[m.author.id]

                        if (!playerPoints) {
                            client.dropPoints[m.author.id] = {
                                points: 1
                            }
                            fs.writeFile("./JSON Files/droppoints.json", JSON.stringify(client.dropPoints, null, 4), (err) => {
                                if (err) throw err;
                            });
                            fs.writeFile("./Backups/dropbackup.json", JSON.stringify(client.dropPoints, null, 4), (err) => {
                                if (err) throw err;
                            });
                            let playerPointDisplay = client.dropPoints[m.author.id].points
                            m.reply(`you got the correct answer!\nYour total points: ${playerPointDisplay}`)
                        } else {

                            playerPoints = client.dropPoints[m.author.id].points

                            client.dropPoints[m.author.id] = {
                                points: playerPoints + 1,
                                user: message.author.tag
                            }
                            fs.writeFile("./JSON Files/droppoints.json", JSON.stringify(client.dropPoints, null, 4), (err) => {
                                if (err) throw err;
                            });
                            fs.writeFile("./Backups/dropbackup.json", JSON.stringify(client.dropPoints, null, 4), (err) => {
                                if (err) throw err;
                            });
                            playerPointDisplay = client.dropPoints[m.author.id].points
                            m.reply(`you got the correct answer!\nYour total points: ${playerPointDisplay}`)
                        }

                    }
                })
                collector.on('end', async (collected, reason) => {

                    if (reason && reason === 'Right answer given.') {

                        finishQuiz.delete(message.author.id)
                    } else {
                        if (message.channel.rateLimitPerUser === 0) {
                            message.channel.send(`Time's up!\nCorrect answer: ${client.drops[quizSubject].display}`)
                            finishQuiz.delete(message.author.id)
                        } else {
                            message.reply(`Time's up!\nCorrect answer: ${client.drops[quizSubject].display}`)
                            finishQuiz.delete(message.author.id)
                        }
                    }
                    finishQuiz.delete(message.author.id)
                });


            } else {

                function randomObject(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
                }

                let quizSubject = randomObject(1, dropAmount)

                let quizEmbed = new MessageEmbed()
                    .setAuthor('Quiz')
                    .setDescription(client.drops[quizSubject].question)
                    .setImage(client.drops[quizSubject].thumbnail)
                    .setFooter('Any errors? DM me!')
                let filter = '';

                if (message.channel.rateLimitPerUser === 0) {
                    message.channel.send(quizEmbed)
                    finishQuiz.add(message.author.id);
                    filter = m => m.channel.id === message.channel.id && !message.author.bot;
                } else {
                    quizEmbed.addField('Note', 'Slowmode is enabled in this channel! Stealing other people\'s quizzes is not possible.')
                    message.reply(quizEmbed)
                    finishQuiz.add(message.author.id);
                    filter = m => m.channel.id === message.channel.id && !message.author.bot && m.author.id === message.author.id;
                }

                const collector = message.channel.createMessageCollector(filter, {
                    time: 1 * 15000
                })



                collector.on('collect', m => {

                    if (m.author.bot) return;

                    if (m.content.toLowerCase().includes(client.drops[quizSubject].name)) {
                        collector.stop('Right answer given.')
                        message.reply('correct!')

                        /*
                        let playerPoints = client.dropPoints[m.author.id]
                        if (!playerPoints) {
                            client.dropPoints[m.author.id] = {
                                points: 1
                            }
                            fs.writeFile("./JSON Files/droppoints.json", JSON.stringify(client.dropPoints, null, 4), (err) => {
                                if (err) throw err;
                            });
                            fs.writeFile("./Backups/dropbackup.json", JSON.stringify(client.dropPoints, null, 4), (err) => {
                                if (err) throw err;
                            });
                            let playerPointDisplay = client.dropPoints[m.author.id].points
                            m.reply(`you got the correct answer!\nYour total points: ${playerPointDisplay}`)
                        } else {

                            playerPoints = client.dropPoints[m.author.id].points

                            client.dropPoints[m.author.id] = {
                                points: playerPoints + 1,
                                user: message.author.tag
                            }
                            fs.writeFile("./JSON Files/droppoints.json", JSON.stringify(client.dropPoints, null, 4), (err) => {
                                if (err) throw err;
                            });
                            fs.writeFile("./Backups/dropbackup.json", JSON.stringify(client.dropPoints, null, 4), (err) => {
                                if (err) throw err;
                            });
                            playerPointDisplay = client.dropPoints[m.author.id].points
                            m.reply(`you got the correct answer!\nYour total points: ${playerPointDisplay}`)
                        }
                        */
                    }
                })
                collector.on('end', async (collected, reason) => {

                    if (reason && reason === 'Right answer given.') {

                        finishQuiz.delete(message.author.id)
                    } else {
                        if (message.channel.rateLimitPerUser === 0) {
                            message.channel.send(`Time's up!\nCorrect answer: ${client.drops[quizSubject].display}`)
                            finishQuiz.delete(message.author.id)
                        } else {
                            message.reply(`Time's up!\nCorrect answer: ${client.drops[quizSubject].display}`)
                            finishQuiz.delete(message.author.id)
                        }
                    }
                    finishQuiz.delete(message.author.id)
                });

            }
       // } catch {
       //     console.log('Missing some sort of permission in the quizme command.')
       // }
    }
}