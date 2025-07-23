module.exports = {
    name: "version",
    description: "HIDDEN",
    category: "dev",
    run: async (client, message, args) => {
        // v0.0.0 bot created.
        // v0.0.1 decided to work on bot.
        // v0.1.0 added "!countdown" command with basic features and got the bot running correctly. Did bug fixes.
        // v0.1.1 "!countdown" changes and bug fixes.
        // v0.2.0 added "!addcountdown" and a welcome message if ever needed.
        // v0.2.1 continued to work on these commands to make them work properly.
        // v1.0.0 added "!help" command around this time. Note: Bot added to /r/StarWars
        // v1.1.0 created a test file to test new code.
        // v1.1.1 kept fixing bugs and adding new features. Added more to "!help".
        // v1.2.0 added "!removecountdown" command.
        // v1.2.1 changed around the countdown commands to make them work properly and so Moderators can manage them. Added enable toggle to help with "!removecountdown".
        // v1.3.0 added "!setstatus" command to set the bot's status without having to rewrite code.

        /*
        All versions before this may not be 100% correct in the timeline. The rest after this will.
        */

        // v1.4.0 added "!version" command.
        // v1.4.1 added another category to "!countdown" (books), and also added a few countdowns to that category. Updated the help command by adding a "userinfo" information page.
        // v1.5.0 added "!suggestcountdown" command.
        // v1.5.1 editted the "!help" command to include "!suggestcountdown" and more.
        // v1.5.2 editted the "!addcountdown" command to be a lot more user friendly. Also editted help to match this change.
        // v2.0.0 started letting people pay for the bot in their server. Made $5.00 on 5/17/2020
        // v2.1.0 added some commands to purge guilds that aren't allowed to have the bot.
        // v2.2.0 added a whitelist command and finished the purge guilds command to keep the bot secure.
        // v3.0.0 forgot many changes before, but finally made the bot public and added some reaction features.
        // v3.0.1 updated prefix command.
        // v4.0.0 SLASH COMMANDS. Rewriting.

        const currentVersion = 'v4.0.0'

        message.channel.send(`Current version: ${currentVersion}`)
    }
}