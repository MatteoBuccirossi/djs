const arg = require('arg');
const inquirer = require('inquirer');
const os = require('os');
const path = require('path');
const chalk = require('chalk');


import {createBot} from './addNew';
import {generateCommand} from './generate';

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

function parseGenArgs(rawArgs){
    const args = arg(
        {
            '--name': String,
            '--description': String,
            '--moderation': Boolean,
            '-n': '--name',
            '-d': '--description',
            '-m': '--moderation'
        },
        {
            argv: rawArgs.slice(2),
        }
    );

    if(args['--name']){
        return{
            name: args['--name'],
            description: args['--description'] || '',
            moderation: args['--moderation'] || false
        }
    }else{
        throw new Error('Missing name');
    }
}

async function promptForMissingArgs(options, operation){
    

    switch(operation){
        case 'new':
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
        case 'g':
            let questions2 = [];
            if(!options.description){
                questions2.push({
                    type: 'input',
                    name: 'description',
                    message: 'Add a command description:',
                    default: ' '
                })
            }

            if(!options.moderation){
                questions2.push({
                    type: 'confirm',
                    name: 'moderation',
                    message: 'Is this a moderation command?',
                    default: false
                })
            }

            const answers2 = await inquirer.prompt(questions2);
            return {
                ...options,
                description: options.description || answers2.description,
                moderation: options.moderation || answers2.moderation
            }
    }
}


export async function cli(args){
    
    let firstCommand = args[2];

    switch(firstCommand){
        case 'new':
            try{
                let options = parseNewArgs(args);
                options = await promptForMissingArgs(options, 'new');
                await createBot(options);
                break;
            }catch(e){
                console.log(chalk.red(e));
                process.exit(1);
            }
        case 'generate':
            try{
                let options = parseGenArgs(args);
                options= await promptForMissingArgs(options, 'g');
                await generateCommand(options);
                break;
            }catch(e){
                console.log(chalk.red(e));
                process.exit(1);
            }
        case 'g':
            try{
                let options = parseGenArgs(args);
                options= await promptForMissingArgs(options, 'g');
                await generateCommand(options);
                break;
            }catch(e){
                console.log(chalk.red(e));
                process.exit(1);
            }
    }

}