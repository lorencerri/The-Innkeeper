const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {

    message.delete(); // Deletes original message

    // Form Embed
    const embed = new Discord.RichEmbed()
        .setThumbnail(client.user.avatarURL) // Icon
        .setColor(0x00AE86) // Color
        .addField(`Servers`, client.guilds.size, true) // Servercount
        .addField(`Channels`, client.channels.size, true) // Channelcount
        .addField(`Users`, client.users.size, true) // Usercount
        .addField(`Custom Emojis`, client.emojis.size, true) // Emojicount
        .setFooter(`To view in-depth statistics type ~<statistic>`) // Footer

    // Send Embed
    message.channel.send({
        embed
    });

}