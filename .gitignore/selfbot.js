const Discord = require ("discord.js")
const config = require ("./config.json")
const superagent = require ("superagent")
const moment = require ("moment")
const bot = new Discord.Client();
const id = config.id;

bot.on('ready', () => {
  console.log(`Le selfbot est opérationnel sur le compte de ${bot.user.username}`)
  bot.user.setPresence({
      game: {
          name: '𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏',
          type: "STREAMING",
          url: "https://www.twitch.tv/flyingggselfbot"
      }
  });
});


bot.on("message", async message => {
  if (message.author.bot) return;

const messageArray = message.content.split(" ");
const command = messageArray[0];
const args = messageArray.slice(1);
const prefix = config.prefix;

//Help 
if (command === `${prefix}help`) {

  if (message.author.id != id) return;
  if (message.author.bot) return;

  message.delete()
  let helpEmbed = new Discord.RichEmbed()
  .setTitle("**𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏**")
  .setDescription("Menu principal")  
  .setColor("RANDOM")
  .addBlankField()  
  .addField("Prefix : /", "Pour afficher la page d'aide des commandes de modération : /mod")
  .addField("**Commandes utilitaire**", "`help : Affiche le menu principal\nbotinfo : Informations sur le Selfbot\nserverinfo : Informations sur le serveur (Ne pas exécuter en DM, fait crash le self)\nstream/game/list/watch <TEXTE>: Change votre statut selon la commande\nping : Affiche le ping du Selfbot\ndelact : Supprime le statut\nreset : Réinitialise le status`")
  .addField("**Commandes fun**", "`avatar [@USER] : Affiche l'avatar\nsay [TEXT] : Ecrit un message en Embed\n8ball [QUESTION] : Pose une question à la 8ball !\ncf : Pile ou face ?\ncat/dog : Générateur de chat/chien aléatoire\nrousseauhack [@USER] : Envoie le rousseau hack à la personne mentionné`")
  .addBlankField()
  .setThumbnail(message.author.avatarURL)
  .setImage("https://cdn.discordapp.com/attachments/595155050704142337/604043339448320030/MOSHED-2019-7-1-14-1-53.gif")
  .setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande help`, message.author.avatarURL);
  message.channel.send(helpEmbed)

  console.log("Commande help exécuté")

}

//Say
if (command === `${prefix}say`) {
  if (message.author.id != id) return;
  if (message.author.bot) return;
  let sayMessage = args.join(" ");
  message.delete().catch();
  let sayMessageEmbed = new Discord.RichEmbed()
  .setDescription(sayMessage)
  .setColor("RANDOM")

  message.channel.send(sayMessageEmbed)
  
  console.log("Commande say exécuté")
}

//Tv
if (command === `${prefix}tv`) {
  if (message.author.id != id) return;
  if (message.author.bot) return;
  message.delete()
  let tvEmbed = new Discord.RichEmbed()
  .setDescription("**NUL MITROGLOU**")
  .setImage("https://cdn.discordapp.com/attachments/595155050704142337/597349965613760535/CalmBleakKitty-max-1mb.gif")
  .setColor("RANDOM")
  .setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande tv`, message.author.avatarURL);

  message.channel.send(tvEmbed)

  console.log("Commande tv exécuté")

}

//Issou
if (command === `${prefix}issou`) {
  if (message.author.id != id) return;
  if (message.author.bot) return;
  message.delete()
    let issouEmbed = new Discord.RichEmbed()
    .setDescription("**Issou**")
    .setImage("https://cdn.discordapp.com/attachments/580118929758748682/596662722620424192/image0.png")
    .setColor("RANDOM")
    .setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande issou`, message.author.avatarURL);
  
    message.channel.send(issouEmbed)
  
    console.log("Commande issou exécuté")

  }

//Kick

if (command === `${prefix}kick`) {
  if (message.author.id != id) return;
  if (message.author.bot) return;
  message.delete()

  let kickUser = message.guild.member (
    message.mentions.users.first() || message.guild.members.get(args[0])
  );

if (!kickUser) {
  let kickUserEmbed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription("L'utilisateur est inexistant. Veuillez reesayer | Syntaxe : ?kick @user#0000")

  return message.channel.send(kickUserEmbed)

}

let kickReason = args.join(" ").slice(22);
if(!message.member.hasPermission("KICK_MEMBERS")) {
  var kickPermissionEmbed = new Discord.RichEmbed()
  .setDescription("Vous n'avez pas la permission d'utiliser cette commande ! (Permission KICK_MEMBERS requise)")
  .setColor("RANDOM")
  return message.channel.send(kickPermissionEmbed);

}
  
  message.delete();
  message.guild.member(kickUser).kick("Vous avez été explusé du serveur", message.guild.name, "pour", kickReason);
  let kickSuccessEmbed = new Discord.RichEmbed()
  .setDescription(`L'utilisateur ${kickUser} a été kick du serveur avec succès !`)
  .setColor("RANDOM")
  return message.channel.send(kickSuccessEmbed)

  console.log("Commande kick exécuté");
}

//Ban

if (command === `${prefix}ban`) {
  if (message.author.id != id) return;
  if (message.author.bot) return;
  message.delete()

let banUser = message.guild.member (
  message.mentions.users.first() || message.guild.members.get(args[0])
);

if (!banUser) {
  let banUserEmbed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription("L'utilisateur est inexistant. Veuillez reesayer | Syntaxe : ?ban @user#0000")

  return message.channel.send(banUserEmbed)

}

let banReason = args.join(" ").slice(22);
if(!message.member.hasPermission("BAN_MEMBERS")) {
  var banPermissionEmbed = new Discord.RichEmbed()
  .setDescription("Vous n'avez pas la permission d'utiliser cette commande ! (Permission BAN_MEMBERS requise)")
  .setColor("RANDOM")
  return message.channel.send(banPermissionEmbed)

}
  
  message.delete();
  message.guild.member(banUser).ban("Vous avez été banni du serveur", message.guild.name, "pour", banReason);
  let banSuccessEmbed = new Discord.RichEmbed()
  .setDescription(`L'utilisateur ${banUser} a été ban du serveur avec succès !`)
  .setColor("RANDOM")
  return message.channel.send(banSuccessEmbed)

  console.log("Commande ban exécuté");
  
}

if (command === `${prefix}avatar`) {
  if (message.author.id != id) return;
  if (message.author.bot) return;
let user = message.mentions.users.first()
message.delete()

let ErrorMentionUser = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription('Syntaxe : ?avatar @user :x:')

if(!user) return message.channel.send(ErrorMentionUser)

    let EmbedAvatarResult = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Avatar de ${user.tag}`)
    .setImage(user.avatarURL)
    .setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande avatar`, message.author.avatarURL);

    message.channel.send(EmbedAvatarResult)
    console.log("Commande avatar exécuté")
}

//Rousseauhack
if (command === `${prefix}rousseauhack`) {

  if (message.author.id != id) return;
  if (message.author.bot) return;
  message.delete(

  )
  let user = message.guild.member (
    message.mentions.users.first() || message.guild.members.get(args[0])
  );

  if (!user) {
    let UserEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription("L'utilisateur est inexistant. Veuillez reesayer | Syntaxe : ?rousseauhack @user#0000")
  
    return message.channel.send(UserEmbed)
  
  }

    let ddosEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`L'utilisateur ${user} a bien été affecté par le rousseau hack.`)
    .setImage("https://cdn.discordapp.com/attachments/580118929758748682/612598018168061952/image0.png")
    .setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande rousseauhack`, message.author.avatarURL);

    
    message.channel.send(ddosEmbed)  
    console.log("Commande rousseauhack exécuté")

}

//8Ball
if (command === `${prefix}8ball`) {
  if (message.author.id != id) return;
  if (message.author.bot) return;
let askErrorEmbed = new Discord.RichEmbed()
.setDescription("Veuillez poser une question. | Syntaxe : ?8ball <question>")
.setColor("RANDOM")
if (!args[0]) return message.reply(askErrorEmbed)

let replies = ["oui.", "non.", "certainement.", "jaaj.", "pourquoi pas.", "tais toi.", "flemme de te répondre.", "hé oui Jamy !", "tu veux du pâté ?", "certainement.", "bien vu.", "pour ne pas te lacher un nique ta mère.", "je ne sais pas.",
"sans pression.", "tu dis que de la merde.", "tu pue.", "sah quel plaisir.", "jvounike.", "bat les couilles."]
let question = args.slice(0).join(" ");
let res = Math.floor((Math.random() * replies.length));

let askEmbed = new Discord.RichEmbed()
.setColor("RANDOM")
.setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande 8ball`, message.author.avatarURL)
.setAuthor(`Question posé : ${question}`)
.setDescription(`Réponse du bot : ${replies[res]}`);
message.channel.send(askEmbed)

console.log("Commande 8ball exécuté")

}   

//Sondage
if (command === `${prefix}sondage`) {
  if (message.author.id != id) return;
  if (message.author.bot) return;

  message.delete()

    let errorEmbed = new Discord.RichEmbed()
    .setDescription("Syntaxe : ?sondage <question>")
    .setColor('RANDOM')
    if (!args[0]) return message.channel.send(errorEmbed)

    let pollEmbed = new Discord.RichEmbed()
    .setTitle('**Sondage**')
    .setColor("RANDOM")
    .setFooter('𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Veuillez répondre au sondage en cochant une des deux réaction', message.author.avatarURL)
    .setDescription(args.join (' '));
    
    let msg = await message.channel.send(pollEmbed)
    await msg.react('✅')
    await msg.react('❌');

}

//Annonce
if (command === `${prefix}annonce`) {
    if (message.author.id != id) return;
    if (message.author.bot) return;

    message.delete()

    let errorEmbed = new Discord.RichEmbed()
    .setDescription("Syntaxe : ?annonce <texte>")
    .setColor('RANDOM')
    if (!args[0]) return message.channel.send(errorEmbed)

    let pollEmbed = new Discord.RichEmbed()
    .setTitle('**Annonce**')
    .setColor("RANDOM")
    .setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande annonce`, message.author.avatarURL)
    .setDescription(args.join (' '));

    let msg = await message.channel.send(pollEmbed)
    await msg.react('✅')

}

//Serverinfo
if (command === `${prefix}serverinfo`) {
  if (message.author.id != id) return;
  if (message.author.bot) return;

  message.delete()

  let serverinfoEmbed = new Discord.RichEmbed()
  .setDescription('Infomations sur le serveur')
  .setColor('RANDOM')
  .setThumbnail(serverIcon)
  .addBlankField()
  .addField('Nom du serveur :', message.guild.name, true)
  .addField('Nombre de membre :', message.guild.memberCount, true)
  .addField('Propriétaire du serveur :', message.guild.owner, true)
  .addField('Serveur crée le :', moment.utc(message.guild.createdAt).format("LLL"), true)
  .addField('Serveur rejoint le :', moment.utc(message.guild.joinedAt).format("LLL"), true)
  .addField('Nombre de rôles :', message.guild.roles.size, true)
  .addField('Nombre de salons :', message.guild.channels.size, true)    
  .addField('ID du serveur :', message.guild.id, true)
  .addBlankField()
  .setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande serverinfo`, message.author.avatarURL);

  message.channel.send(serverinfoEmbed)
  
}

//Botinfo
if (command === `${prefix}botinfo`) {
  if (message.author.id != id) return;
  if (message.author.bot) return;

  message.delete()

  let infoEmbed = new Discord.RichEmbed()
  .setDescription('Infomations sur le serveur')
  .setColor('RANDOM')
  .addBlankField()
  .setThumbnail(message.author.avatarURL)
  .addField('Nom du Selfbot :', "𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏", true)
  .addField('Développeurs du Selfbot :', "マスターケバブ#6666 & Voltan#0212", true)
  .addField('API :', "discord.js, moment, superagent", true)
  .addField('Serveur de support :', ("https://discord.gg/KtW8xjN"), true)
  .addField("Version du Selfbot :", "2.1", true)
  .addBlankField()
  .setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande botinfo`, message.author.avatarURL);

  message.channel.send(infoEmbed)
  
}

//Cat

if (command === `${prefix}cat`) {
  if (message.author.id != id) return;
  if (message.author.bot) return;

  message.delete()

  let { body } = await superagent.get('http://aws.random.cat//meow')
  
      let catEmbed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Cat Generator")
      .setImage(body.file)
      .setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande cat`, message.author.avatarURL);
  
      message.channel.send(catEmbed)
      console.log("Commande cat exécuté")

    }

//Cf
if (command === `${prefix}cf`) {
    if (message.author.id != id) return;
    if (message.author.bot) return;
    message.delete()

  let cfreponse = ["Pile", "Face"]
  let res = Math.floor((Math.random() * cfreponse.length));

  let cfEmbed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande cf`, message.author.avatarURL)
  .setDescription(`La pièce est tombé du côté : ${cfreponse[res]}`)
  .setThumbnail(message.author.avatarURL);
  message.channel.send(cfEmbed)

  console.log("Commande cf exécuté")

  }  

//Stream
  if(command === `${prefix}stream`) {
    if (message.author.id != id) return;
    if (message.author.bot) return;
    message.delete()

    let errorStreamEmbed = new Discord.RichEmbed()
    .setDescription("Veuillez saisir un statut. | Syntaxe : /stream [TEXTE]")
    .setColor("RANDOM")
    if (!args[0]) return message.reply(errorStreamEmbed)

    let streamStatus = args.join(" ");

    bot.user.setPresence({
      game: {
          name: `${streamStatus}`,
          type: "STREAMING",
          url: "https://www.twitch.tv/flyingggselfbot"
      }
  });

    let streamSuccessEmbed = new Discord.RichEmbed()      
    .setDescription(`Votre statut est désormais ${streamStatus} ! Pour effacer le statut, exécuter la commande /reset | Pour effacer le statut, exécuter la commande /delact`)
    .setColor("RANDOM")
    .setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande stream`, message.author.avatarURL)

    message.channel.send(streamSuccessEmbed)
    
    console.log("Commande stream exécuté")


}

//List
if(command === `${prefix}list`) {
  if (message.author.id != id) return;
  if (message.author.bot) return;
  message.delete()

  let errorListEmbed = new Discord.RichEmbed()
  .setDescription("Veuillez saisir un statut. | Syntaxe : /list [TEXTE]")
  .setColor("RANDOM")
  if (!args[0]) return message.reply(errorListEmbed)

  let ListStatus = args.join(" ");

  bot.user.setPresence({
    game: {
        name: `${ListStatus}`,
        type: "LISTENING",
    }
});

  let ListSuccessEmbed = new Discord.RichEmbed()      
  .setDescription(`Votre statut est désormais ${ListStatus} ! Pour effacer le statut, exécuter la commande /reset | Pour effacer le statut, exécuter la commande /delact`)
  .setColor("RANDOM")
  .setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande list`, message.author.avatarURL)

  message.channel.send(ListSuccessEmbed)
  
  console.log("Commande list exécuté")

}

//Game
if(command === `${prefix}game`) {
  if (message.author.id != id) return;
  if (message.author.bot) return;
  message.delete()

  let errorGameEmbed = new Discord.RichEmbed()
  .setDescription("Veuillez saisir un statut. | Syntaxe : /game [TEXTE]")
  .setColor("RANDOM")
  if (!args[0]) return message.reply(errorGameEmbed)

  let GameStatus = args.join(" ");

  bot.user.setPresence({
    game: {
        name: `${GameStatus}`,
    }
});

  let GameSuccessEmbed = new Discord.RichEmbed()      
  .setDescription(`Votre statut est désormais ${GameStatus} ! Pour effacer le statut, exécuter la commande /reset | Pour effacer le statut, exécuter la commande /delact`)
  .setColor("RANDOM")
  .setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande game`, message.author.avatarURL)

  message.channel.send(GameSuccessEmbed)
  
  console.log("Commande game exécuté")

}

//Watch
if(command === `${prefix}watch`) {
  if (message.author.id != id) return;
  if (message.author.bot) return;
  message.delete()

  let errorWatchEmbed = new Discord.RichEmbed()
  .setDescription("Veuillez saisir un statut. | Syntaxe : /watch [TEXTE]")
  .setColor("RANDOM")
  if (!args[0]) return message.reply(errorWatchEmbed)

  let WatchStatus = args.join(" ");

  bot.user.setPresence({
    game: {
        name: `${WatchStatus}`,
        type: 'WATCHING'
    }
});

  let WatchSuccessEmbed = new Discord.RichEmbed()      
  .setDescription(`Votre statut est désormais ${WatchStatus} ! Pour réinitialiser le statut, exécuter la commande /reset | Pour effacer le statut, exécuter la commande /delact`)
  .setColor("RANDOM")
  .setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande watch`, message.author.avatarURL)

  message.channel.send(WatchSuccessEmbed)
  
  console.log("Commande watch exécuté")

}

//Reset
if(command === `${prefix}reset`) {
  if (message.author.id != id) return;
  if (message.author.bot) return;
  message.delete()

  bot.user.setPresence({
    game: {
        name: `𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 `,
        type: "STREAMING",
        url: "https://www.twitch.tv/flyingggselfbot"
    }
});

  let resetSuccessEmbed = new Discord.RichEmbed()      
  .setDescription(`Votre status a été reset avec succès.`)
  .setColor("RANDOM")
  .setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande reset`, message.author.avatarURL)

  message.channel.send(resetSuccessEmbed)
  
  console.log("Commande reset exécuté")
  
}

//Delact
if(command === `${prefix}delact`) {
  if (message.author.id != id) return;
  if (message.author.bot) return;
  message.delete()

  bot.user.setPresence({
    game: {
        name: ``,
    }
});

  let delactSuccessEmbed = new Discord.RichEmbed()      
  .setDescription(`Votre status a été effacé avec succès.`)
  .setColor("RANDOM")
  .setFooter(`𝙄𝙉𝙎𝙊𝙈𝙉𝙄𝘼 𝙎𝙀𝙇𝙁𝘽𝙊𝙏 | Commande delact`, message.author.avatarURL)

  message.channel.send(delactSuccessEmbed)
  
  console.log("Commande delact exécuté")
  
}

})



bot.login(config.token);