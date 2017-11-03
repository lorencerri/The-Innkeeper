// Require Packages
const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {

    // Check to see if they entered any numbers
    if (!args) return message.channel.send({
        embed: {
            description: "**Please enter numbers, seperated by spaces.**",
            color: 0x1D82B6
        }
    });

    // Check to see if entries are all numbers
    for (var i in args) {
        if (isNaN(args[i])) return message.channel.send({
            embed: {
                description: "**Please enter numbers, seperated by spaces.**",
                color: 0x1D82B6
            }
        });
        args[i] = Math.abs(args[i])
    }

    // Variables
    let totalValue = 0;
    let values = 0;

    // Form responses from arguments
    for (var i in args) {
        totalValue += args[i];
        values++;
    }

    // Form Embed

    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)

    embed.setDescription(`**Sum: \`${totalValue}\` from \`${values}\` numbers**`);

    message.channel.send({
        embed
    })

}