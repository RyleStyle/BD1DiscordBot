module.exports = {
    name: "tutorial",
    description: "HIDDEN",
    category: "dev",
    run: async (client, message, args) => {

        const { MessageEmbed } = require("discord.js")

        var countdown = require('moment-countdown');
        var moment = require("moment-timezone");
        var momentDurationFormatSetup = require("moment-duration-format");
    
        momentDurationFormatSetup(moment);
        typeof moment.duration.fn.format === "function";
        // true
        typeof moment.duration.format === "function";
        // true

        if (message.author.id !== '406880301449478144') return console.log(`${message.author.name} is trying to use !tutorial for some reason.`)
        console.log(`Tutorial run.`)

        client.tutorialDates = require('../.././tutorials.json')

        const today = moment().format("MM-DD-YYYY")

        const tutorialEmbed = new MessageEmbed()
        .setAuthor(`Tutorial of ${today}`)

        for (let [key, value] of Object.entries(client.tutorialDates)) {
              
              if (moment().format("YYYY-MM-DD") === moment(key).format("YYYY-MM-DD")) {
                console.log('Tutorial today run.')
                tutorialEmbed.setDescription(`Tutorial today: ${value.tutorial}`)
              }
          }

        message.reply(tutorialEmbed)


    }
}