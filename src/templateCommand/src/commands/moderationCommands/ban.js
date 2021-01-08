const helper = require('../../helper');

module.exports={
    name: '!ban',
    description: "'!ban @member' to ban a member. Mod permissions required.",
    execute(msg, args, commands){
        if(helper.permissionCheck(msg)){
            const user = msg.mentions.users.first();
            if(user){
                const member = msg.guild.member(user);
                if(member){
                    member.ban({reasons: 'You have been banned from the server. Reasons will be provided.'}).then(()=>{
                        msg.reply(`successfully banned ${user.tag}`);
                    }).catch(e=>{
                        msg.reply('An error occoured, unable to ban.')
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