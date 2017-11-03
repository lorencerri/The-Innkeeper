const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {

    message.delete(); // Deletes original message

    // Form serverlist
    let serverList = '**Server Names:**\n'; // Creates a string
    let memberCount = 0; // Creates an empty integer

    client.guilds.forEach((g) => { // Runs a loop of each guild

        memberCount += g.memberCount; // Add to memberCount

    });

    client.guilds.forEach((g) => { // Runs a loop of each guild

        serverList += `${g.name} **(${g.memberCount} users / ${tools.percentage([g.memberCount,memberCount-g.memberCount],1).toFixed(2)}%)**\n` // Add to serverList

    });

    // Check the length of the serverList
    if (serverList.length > 2048) { // Run this if it is greater than the limit.

        // Form Embed
        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86) // Color
            .addField(`Servers`, client.guilds.size, true) // Servercount
            .setDescription(`**Too many servers to list their names...**`)

        // Send Embed
        message.channel.send({
            embed
        }) // Send Embed

    }

    // Form Embed
    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86) // Color
        .addField(`Servers`, client.guilds.size, true) // Servercount
        .setDescription(serverList) // Serverlist

    // Send Embed
    message.channel.send({
        embed
    })

}