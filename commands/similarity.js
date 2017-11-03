exports.run = (client, message, args, tools) => {
    
    tools.embed(message.channel, `**Suggested Similarity:** \`${tools.similar(args.join(" ").trim().split(",")[0],args.join(" ").trim().split(",")[1],false)}%\``)

}