const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
  data: new SlashCommandBuilder()
  .setName('countdown')
  .setDescription('Countdowns to Star Wars events.'),
  async execute(interaction, client) {

    const {
      MessageEmbed
    } = require("discord.js")


    var countdown = require('moment-countdown');
    var moment = require("moment-timezone");
    var momentDurationFormatSetup = require("moment-duration-format");

    momentDurationFormatSetup(moment);
    typeof moment.duration.fn.format === "function";
    // true
    typeof moment.duration.format === "function";
    // true

    client.countdowns = require("../../JSON Files/savedcountdowns.json")

    const sortedData = Object.entries(client.countdowns)
      .sort(([, value], [, v]) => new Date(value.release) - new Date(v.release))
      .reduce((acc, [k, v]) => {
        acc[k] = v;
        return acc;
      }, {});

    let today = new Date();
    let todayMoment = moment(today)

    let countdownTimezone = todayMoment.tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('z')



      const embed = new MessageEmbed()
        .setAuthor({ name: `Timezone: ${countdownTimezone}` })
        .setDescription('__Countdowns are (attempted to be) added regularly.__')
        .setColor("#fffff0")


      for (let [key, value] of Object.entries(sortedData)) {

        if (value.enabled === true) {

          if (moment(value.release).isBefore()) {
            embed.addField(`${key} | ${value.release}`, `Released on: ${value.release}!`)
          }
          if (!moment(value.release).isBefore()) {
            
            const dateOfRelease = moment(value.release).countdown()
            embed.addField(`${key} | ${value.release}`, `Releases in: ${dateOfRelease}.`)
          }

        }
      }
      interaction.reply({ embeds: [ embed ] })




  }
}