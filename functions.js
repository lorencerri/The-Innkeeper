// Import Packages
const stringSimilarity = require('string-similarity');

module.exports = {

    hook: function (channel, title, message, color, avatar) {

        // Reassign default parameters - If any are blank.
        if (!channel) return console.log('Channel not specified.');
        if (!title) return console.log('Title not specified.');
        if (!message) return console.log('Message not specified.');
        if (!color) color = 'd9a744'; // This is an optional variable. Therefore the default HEX color will be whatever you post there. Mine will be d9a744
        if (!avatar) avatar = 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png' // This is also an optional variable, you can change the default to any icon.

        // We want to remove spaces from color & url, since they might have it on the sides.
        color = color.replace(/\s/g, '');
        avatar = avatar.replace(/\s/g, '');

        // This is the start of creating the webhook
        channel.fetchWebhooks() // This gets the webhooks in the channel
            .then(webhook => {

                // Fetches the webhook we will use for each hook
                let foundHook = webhook.find('name', 'Webhook'); // You can rename 'Webhook' to the name of your bot if you like, people will see if under the webhooks tab of the channel.

                // This runs if the webhook is not found.
                if (!foundHook) {
                    channel.createWebhook('Webhook', 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png') // Make sure this is the same thing for when you search for the webhook. The png image will be the default image seen under the channel. Change it to whatever you want.
                        .then(webhook => {
                            // Finally send the webhook
                            webhook.send('', {
                                    "username": title,
                                    "avatarURL": avatar,
                                    "embeds": [{
                                        "color": parseInt(`0x${color}`),
                                        "description": message
                                    }]
                                })
                                .catch(error => { // We also want to make sure if an error is found, to report it in chat.
                                    console.log(error);
                                    return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                                })
                        })
                } else { // That webhook was only for if it couldn't find the original webhook
                    foundHook.send('', { // This means you can just copy and paste the webhook & catch part.
                            "username": title,
                            "avatarURL": avatar,
                            "embeds": [{
                                "color": parseInt(`0x${color}`),
                                "description": message
                            }]
                        })
                        .catch(error => { // We also want to make sure if an error is found, to report it in chat.
                            console.log(error);
                            return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                        })
                }

            })

    },

    randomArray: function (array) {

        if (!Array.isArray(array)) {
            return "Not an array!";
        } else {
            return array[Math.floor(Math.random() * array.length)]
        }
    },

    percentage: function (arrayOfNumbers, options) { // Options: 1 = Hoisted (=100%), 2 = Freeform(=Any%)

        // Check for array
        if (!arrayOfNumbers || arrayOfNumbers.length === 0) { // Run if array is empty or null

            return 'Please enter an array of numbers';

        }

        // Variables
        let yValue = 0;

        // Form yValue
        for (var i in arrayOfNumbers) {

            // Check if it is a number
            if (isNaN(arrayOfNumbers[i])) {

                return 'One of your entries wasn\'t an integer';

            }

            yValue += parseInt(arrayOfNumbers[i], 10); // Add to yValue

        }

        if (options != 1) {
            yValue -= arrayOfNumbers[0]; // Subtract the first number, so it doesn't skew.
        }

        // Log algorithm
        //console.log(`(${arrayOfNumbers[0]} / ${yValue}) * 100 = ${(arrayOfNumbers[0] / yValue) * 100}`)

        // Return
        return (arrayOfNumbers[0] / yValue) * 100;

    },

    embed: function (channel, message) {
        channel.send({
            embed: {
                description: message,
                color: 0x527f68
            }
        });
    },

    similar: function (input, message, boolean) {

        let similarity = stringSimilarity.compareTwoStrings(input, message);

        if (boolean) {
            if (similarity > .70) return true;
            else false;
        } else {
            return (similarity * 100).toFixed(2);
        }

    }

}