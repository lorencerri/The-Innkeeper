// Require Packages
const Discord = require('discord.js');

exports.run = (client, message, args, tools) => {

    // Check to see if they entered any numbers
    if (!args) return message.channel.send({
        embed: {
            description: "**Please enter numbers, separated by spaces.**",
            color: 0x1D82B6
        }
    });

    // Check to see if entries are all numbers
    for (var i in args) {
        if (isNaN(args[i])) return message.channel.send({
            embed: {
                description: "**Please enter numbers, separated by spaces.**",
                color: 0x1D82B6
            }
        });
        args[i] = Math.abs(args[i])
    }

    // Variables
    let responseTable = [];
    let description = '';
    let totalValue = 0;

    // Form responses from arguments
    for (var i in args) {

        // Shift current argument to front
        var item = args.splice(args.indexOf(args[i]), 1);
        args.unshift(item.toString());

        // Generate Result
        responseTable.push([item.toString(), tools.percentage(args, 1)])

    }

    // Form Embed

    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)

    for (var i in responseTable) {

        description += `(${responseTable[i][0]}) = **${responseTable[i][1].toFixed(2)}%**\n`
        totalValue += parseInt(responseTable[i][0]);

    }

    // Add Formula
    description += `\n**Formula:**\n(# / **${totalValue}**) * 100 = %`

    if (description.length > 2048) {
        embed.setDescription('**You entered too many numbers!**');
        return message.channel.send({
            embed
        })
    }

    embed.setDescription(description);

    message.channel.send({
        embed
    })

}
