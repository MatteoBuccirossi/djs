import fs from 'fs';
import chalk from 'chalk';
import ncp from 'ncp';
import path from 'path';
import {promisify} from 'util';
import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const os = require('os');


const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplate(options){
    return copy(path.join(__dirname, options.command ? 'templateCommand' : 'templateStd'), options.targetDirectory, {
        clobber: false,
    });
}

async function makeNewDirectory(name){
    let newDir = path.join(os.homedir(), name);
    await fs.mkdir(newDir, (e)=>{
        if(e){
            throw new Error(e);
        }
    });

    return newDir;
}

export async function createBot(options){
    let targetDir = await makeNewDirectory(options.name);

    options = {
        ...options,
        targetDirectory: targetDir,
    };

    let tasks = new Listr([
        {
            title: 'Creating project directory',
            task: ()=> copyTemplate(options),
        },
        {
            title: 'Initializing directory',
            task: ()=> projectInstall({
                cwd: targetDir
            })
        }
    ]);
    await tasks.run();
    console.log('%s Created project!', chalk.green.bold('DONE'));
}

