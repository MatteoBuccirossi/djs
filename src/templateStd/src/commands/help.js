const discord = require('discord.js');
module.exports = {
    name: '!help',
    description: 'Get bot commands',
    execute(msg, args, commands){
        const helpMessage = new discord.MessageEmbed().setTitle('Help Page').setColor(0xffCD00);
        commands.forEach((val, key, map)=>{
            helpMessage.addField(key, val['description']);
        });
        msg.channel.send(helpMessage);
    }
}