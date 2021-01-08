require('dotenv').config();
const discord = require('discord.js');
const helper = require('./helper')
const helpcmd = require('./commands/help');



const bot = new discord.Client();
bot.commands = new discord.Collection;
bot.login(process.env.TOKEN);

const commands= [helpcmd];

function setModules(cmds){
    for(let command of cmds){
        bot.commands.set(command['name'], command);
    }
}

bot.on('ready', ()=>{
    setModules(commands);
    console.log('connected');
});

bot.on('message', (msg)=>{
    try{
        const args = helper.parseMsg(msg.content);
        const command = args.shift();

        if(!bot.commands.has(command)) return;
        bot.commands.get(command).execute(msg, args, bot.commands);

    }catch(e){
        console.log(e);
    }
});