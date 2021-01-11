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

async function importCommand(options){
    const index = fs.readFileSync(path.join(process.cwd(), 'src', 'index.js'),'utf-8');
    const imported = `const ${options.name} = require('./${options.moderation ? 'commands/moderationCommands/': 'commands/'}${options.name}');
` + index; 
    fs.writeFileSync(path.join(process.cwd(), 'src', 'index.js'), imported, (e)=>{
        if(e){
            throw new Error(e);
        }
    });

}

//this function is here because of problems with the linux os
async function moderationCommandsSingleton(options){
    const exists = fs.existsSync(path.join(process.cwd(), 'src', 'commands', 'moderationCommands'));
    if(exists){
        return;
    }else{
        fs.mkdirSync(path.join(process.cwd(), 'src', 'commands', 'moderationCommands'), (e)=>{
            if(e){
                throw new Error(e);
            }
        })
    }
}

async function isDjsBotDirectory(){
    return fs.existsSync(path.join(process.cwd(), 'src', 'commands'));
}



export async function generateCommand(options){


    if(await isDjsBotDirectory()){
        let tasks = new Listr([
            {
                title: 'Checking for moderation directory',
                skip: () => {
                    if(!options.moderation){
                        return "Skipping because this isn't a moderation command";
                    }
                },
                task: ()=> moderationCommandsSingleton(options)
            },
            {
                title: 'Creating new command',
                task: ()=> writeNewCommand(options)
            },
            {
                title: 'Updating imports in index.js',
                task: ()=> importCommand(options)
            }
        ]);
        await tasks.run();
        console.log(`%s Created new command ${options.name}`, chalk.green.bold('DONE'));
    }else{
        throw new Error('Not a bot directory. Unable to create new command.')
    }
}