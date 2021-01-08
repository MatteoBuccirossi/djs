const arg = require('arg');
const inquirer = require('inquirer');
const os = require('os');
const path = require('path');
const chalk = require('chalk');


import {createBot} from './main';

function parseNewArgs(rawArgs){
    const args = arg(
       {
           '--new': String,
           '--commands': Boolean,
           '-n': '--new',
           '--name': '--new',
           '-c': '--commands'
       } ,
       {
           argv: rawArgs.slice(2),
       }

    );
    if(args['--new']){
        return{
            name: args['--new'] ,
            command: args['--commands'] || false
        }
    }else{
        throw new Error('Missing name');
    }
}

async function promptForMissingArgs(options){
    let questions = [];

    if(!options.command){
        questions.push({
            type: 'confirm',
            name: 'command',
            message: 'Add premade moderation commands to your bot?',
            default: false
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        command: options.command || answers.command,
    }
}


export async function cli(args){
    
    let firstCommand = args[2];

    switch(firstCommand){
        case 'new':
            try{
                let options = parseNewArgs(args);
                options = await promptForMissingArgs(options);
                await createBot(options);
            }catch(e){
                console.log(chalk.red(e));
                process.exit(1);
            }
    }

}