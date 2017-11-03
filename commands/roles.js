const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {

    message.delete(); // Deletes original message

    // Variables
    let roles = '**Server Roles:** \n';
    let roleCount = 0;
    let memberCount = 0;


    message.guild.members.forEach((u) => {

        memberCount++

    })


    message.guild.roles.forEach((r) => {

        roles += `${r.name} **(${r.members.size} members / ${tools.percentage([r.members.size,memberCount]).toFixed(2)}%)**\n`;
        roleCount++

    })

    // Form Embed
    const embed = new Discord.RichEmbed()
        .setThumbnail(message.guild.iconURL) // Icon
        .setColor(0x527f68) // Color
        .addField(`Roles`, roleCount, true) // roleCount
        .setDescription(roles) // Roles

    // Send Embed
    message.channel.send({
        embed
    }) // Send Embed

}