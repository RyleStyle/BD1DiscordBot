module.exports = {
    name: "time",
    description: "HIDDEN",
    category: "dev",
    run: async (client, message, args) => {

        var countdown = require('moment-countdown');
        var moment = require("moment-timezone");
        var momentDurationFormatSetup = require("moment-duration-format");

        momentDurationFormatSetup(moment);
        typeof moment.duration.fn.format === "function";
        // true
        typeof moment.duration.format === "function";
        // true

        let today = new Date()

        let currentDate = moment(today);
        let currentFormat = moment(currentDate).format("[The day is] [**]MMMM Do, YYYY[**][\nThe time is:**] h:mm A[**]")
        let currentTimezone = currentDate.tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('[**]z[**]')

        message.channel.send(`${currentFormat} ${currentTimezone}`)

        // Intl.DateTimeFormat().resolvedOptions().timeZone
    }
}