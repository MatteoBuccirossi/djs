const fs = require('fs');
import chalk from 'chalk';
import path from 'path';
import Listr from 'listr';



async function writeNewCommand(options){
    const pathStd = path.join(process.cwd(), 'src', 'commands');
    const pathMod = path.join(process.cwd(), 'src', 'commands', 'moderationCommands')
    const commandStd= `
    module.exports={
        name: '!${options.name}',
        description: "${options.description}",
        execute(msg, args, commands){
        //command logic
    }
}`;
    const commandMod = `const helper = require('../../helper');

    module.exports={
        name: '!${options.name}',
        description: "${options.description}",
        execute(msg, args, commands){
            if(helper.permissionCheck(msg)){
                //command logic
            }
        }
    }`;

    fs.writeFileSync(path.join(options.moderation ? pathMod : pathStd, `${options.name}.js`), options.moderation ? commandMod: commandStd, (e)=>{
        if(e){
            throw new Error(e);
        }
    });
}

async function isDjsBotDirectory(){
    return fs.existsSync(path.join(process.cwd(), 'src', 'commands'));
}



export async function generateCommand(options){


    if(await isDjsBotDirectory()){
        let tasks = new Listr([
            {
                title: 'Creating new command',
                task: ()=> writeNewCommand(options),
            }
        ]);
        await tasks.run();
        console.log(`%s Created new command ${options.name}`, chalk.green.bold('DONE'));
    }else{
        throw new Error('Not a bot directory. Unable to create new command.')
    }
}