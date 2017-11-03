// Import Packages
const moment = require('moment');

// Responses
const invalid = ["Sorry I didn't understand that.", "I'm afraid I don't know the answer to that question.", "I'm sorry, I have not been trained to understand that yet."];
const name = ["I'm *The Innkeeper*, how may I be of service?", "My name is *The Innkeeper*."]
const time = [`The time is currently ${moment().format('LT')} in the *Pacific Time Zone*.`, `It's ${moment().format('LT')} PST!`]

exports.run = (client, message, args, tools) => {

    // Check for arguments
    if (args.join(" ").trim().length === 0) return tools.embed(message.channel, `**Hello ${message.author}, \n\nI can respond to most phrases by doing: \n\`@${client.user.username} <phrase>\`**`);

    // Variables
    let fallback = false;
    let msg = args.join(" ").toUpperCase();
    let response;
    let re = message.channel;

    // Programmed Responses
    if (tools.similar(msg, "What is your name?", true) || tools.similar(msg, "Whats ur name", true)) { // Name
        re.send(tools.randomArray(name));
    } else if (tools.similar(msg, "What's the time?", true) || tools.similar(msg, "What time is it?")) { // Time
        re.send(tools.randomArray(time));
    } else fallback = true;

    // Fallback Responses
    if (fallback) message.channel.send(invalid[Math.floor(Math.random() * invalid.length)]);
    else message.channel.send(response);

}