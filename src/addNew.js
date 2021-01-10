const fs = require('fs');
import chalk from 'chalk';
import ncp from 'ncp';
import path from 'path';
import {promisify} from 'util';
import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const os = require('os');
const copy = promisify(ncp);

async function copyTemplate(options){
    return copy(path.join(__dirname, options.command ? 'templateCommand' : 'templateStd'), options.targetDirectory, {
        clobber: false,
    }).catch(e=>{
        if(e){
            throw new Error(e);
        }
    });
}

async function makeNewDirectory(name){
    if(!fs.existsSync(path.join(os.homedir(), 'djsBots'))){
        fs.mkdir(path.join(os.homedir(), 'djsBots'), (e)=>{
            if(e){
                throw new Error(e);
            }
        });
    }
    let newDir = path.join(os.homedir(),'djsBots', name);
    await fs.mkdir(newDir, (e)=>{
        if(e){
            throw new Error(e);
        }
    });
    return newDir;
}

async function copyNameToJSON(options){
    const packagePath = path.join(options.targetDirectory,  'package.json');
    const pac = JSON.parse(fs.readFileSync(packagePath));
    pac.name = options.name;
    fs.writeFileSync(packagePath, JSON.stringify(pac));
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
        },
        {
            title: 'Updating package.json',
            task: ()=> copyNameToJSON(options),
        }
    ]);
    await tasks.run();
    console.log("%s Created project in your homepath's djsBots folder!", chalk.green.bold('DONE'));
}

