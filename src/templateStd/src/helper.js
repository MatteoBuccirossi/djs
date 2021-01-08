exports.parseMsg  = (msg)=>{
  let args = [];
  msg.split(" ").forEach((arg)=>{
    if(arg !== ""){
      args.push(arg)
    }
  });
  return args;
}

exports.permissionCheck = (msg)=>{
  return(msg.member.hasPermission('ADMINISTRATOR') || msg.member.roles.cache.find(r => r.name === "moderator"));
}

