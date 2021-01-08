const helper = require('../../helper');

module.exports={
    name: '!kick',
    description: "'!kick @member' to kick a member. Mod permissions required.",
    execute(msg, args, commands){
        if(helper.permissionCheck(msg)){
            const user = msg.mentions.users.first();
            if(user){
                const member = msg.guild.member(user);
                if(member){
                    member.kick('You have been kicked. Reasons will be provided.').then(()=>{
                        msg.reply(`successfully kicked ${user.tag}`);
                    }).catch(e=>{
                        msg.reply('An error occoured, unable to kick.')
                    });
                }else{
                    message.reply("the user isn't in this guild!");
                }
            }else{
                msg.reply("specify a member.")
            }
        }else{
            msg.reply("you don't have the necessary permissions.");
        }
    }
}