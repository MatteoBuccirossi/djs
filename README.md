<p align="center" >
  <a href="https://www.npmjs.com/package/djs-cli">
    <img alt="djs" height="250"  src="https://raw.githubusercontent.com/MatteoBuccirossi/djs/master/djs-logo.png"/>
  </a>
  </p>
  <p align="center">
   <img alt="NPM" src="https://img.shields.io/npm/l/djs-cli?color=blue">
   <img alt="npm" src="https://img.shields.io/npm/dw/djs-cli">
  <img alt="npm" src="https://img.shields.io/npm/v/djs-cli?color=violet">
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/MatteoBuccirossi/djs?color=green">
  </p>
      
# djs
  
Djs, a cli to speed up discord bots development

## Installation

Use the node package manager [npm](https://www.npmjs.com/package/djs-cli) to install and run djs.

```bash
npm i -g djs-cli
```

## Usage 

**Create a new bot**:

To create a new bot directory run :
```bash
djs new -n <name>
```
Use the -c flag to include premade bot commands:
```bash
djs new -n <name> -c
```
All bots created with this package include a help command, while if you choose to include premade moderation commands as well, prebuilt kick and ban commands will be automatically programmed into your bot.

All bots are saved in a folder called djsBots in your system's homepath.

**Add a command to an existing bot:**

This works only in directories created with the djs cli.

To add a new command to your bot, in you bot's directory run:
```bash
djs generate (or just 'g') -n <name>
```
Use the -m flag to mark it as a moderation command:
```bash
djs generate -n <name> -m
```
Commands added this way will be automatically saved either in your bot's command directory, if it isn't a moderation command, or in the commands/moderationCommands directory.
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)
