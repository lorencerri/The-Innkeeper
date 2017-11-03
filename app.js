// Calling Packages
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const tools = require('./functions.js');

// Global Settings
const prefix = '~';

client.on('message', message => {

    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();
    let mentioned = false;

    // Check if the bot was mentioned.
    if (message.content.toString().trim().startsWith(`<@${client.user.id}>`)) {
        mentioned = true;
        cmd = 'mentioned';
    }

    // Aliases
    if (cmd === 'percentage') cmd = '%';
    if (cmd === 'perc') cmd = '%';
    if (cmd === 'statistics') cmd = 'stats';
    if (cmd === 'similar') cmd = 'similarity';
    if (cmd === 'help') cmd = 'commands';
    if (cmd === 'add') cmd = 'sum';
    if (cmd === 'chat') cmd = 'mentioned';
    if (cmd === 'commandslink') cmd = 'cmdlink';

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix) && !mentioned) return;

    try {

        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args, tools);

    } catch (e) {

        if (!e.message.startsWith("Cannot find module"))
            console.log(e.message);

    } finally {

        console.log(`${message.author.username} ran '${cmd}' in ${message.guild.name}`);

    }

});

client.on('ready', () => {

    console.log('Bot started.');
    client.user.setGame(`discord.me/TheInn`);

});

client.on('guildCreate', guild => {
    try {
        client.guilds.get('374080288269008896').channels.get('376070966230384640').send({
            embed: {
                description: `**Joined Guild: ${guild.name}**`,
                color: 0x93c47d,
                thumbnail: {
                    url: guild.iconURL
                },
                fields: [{
                        name: `Members`,
                        value: guild.memberCount
                    },
                    {
                        name: `Channels`,
                        value: guild.channels.size
                    }
                ]
            }
        });
    } catch (e) {
        console.log(e.message);
    }
});

client.on('guildDelete', guild => {
    try {
        client.guilds.get('374080288269008896').channels.get('376070966230384640').send({
            embed: {
                description: `**Left Guild: ${guild.name}**`,
                color: 0xe06666,
                thumbnail: {
                    url: guild.iconURL
                },
                fields: [{
                        name: `Members`,
                        value: guild.memberCount
                    },
                    {
                        name: `Channels`,
                        value: guild.channels.size
                    }
                ],
            }
        });
    } catch (e) {
        console.log(e.message);
    }
});

client.login('token');