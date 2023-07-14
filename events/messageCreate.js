const translate = require('@iamtraction/google-translate');
const {  Events, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

const guildObj = JSON.parse(process.env.guilds);
const langs = JSON.parse(process.env.languages);


module.exports = {
    name: 'messageCreate',
    async execute(message) {

    const regCustomEmojiOnly = /^(<:\S*:\d*>)$/g;
    const regUser = /(?<=<@)\d+(?=>)/g;
    const regUser2 = /<@(?<userid>\d+)>/g;
    const regCustomEmoji = /<:(?<emojiname>\S)*:(?<emojiid>\d)*>/g;
        
    if(message.attachments.size>0) return;
    if (message.author.bot) return;
    if (regCustomEmojiOnly.test(message.content)) {return;} //Custom emoji only
    if (message.content.startsWith('http')) {return;}

    const channel = message.channel; // May be DM or Guild Channel
    
    //to replace a user id with a name
    message.content=message.content.replaceAll(regCustomEmoji, '');  

    match = message.content.match(regUser);
  //  console.log(match);
    if(match)
    {
    for(var i = 0; i< match.size; i++)
    {
    
        message.content=await message.content.replaceAll(regUser2,  message.guild.members.fetch(match[i]).nickname);
    }
//    console.log(message.content);
    }
    /*if(regUser.test(message.content))
    {
        console.log(   `regex working`);
        arrayString = message.content.match(regUser);
        console.log(arrayString);
        var             regexNotDigit = /\d*//*g;
        for(var i = 0; i<arrayString.length; i++)
        {
            var userID = arrayString[i].match(regexNotDigit);
            console.log(`IN FOR` + userID[0]);
            var replacement = message.guild.members.fetch(userID[0]).nickname ?? message.guild.members.fetch(userID[0]).username;
            message.content.replace(arrayString[i], replacement);
        }
        console.log(message.content);
    }*/

    //Guild Scenario
    if(message.guild)
    {
    const guildId = message.guild.id;

    let thisGuild =  guildObj.filter(it => it.serverid === guildId); //working
    if(thisGuild.length>0){var mainLang = langs.filter(it => it.display === thisGuild[0].mainL);}else {console.log(guildId+" No Guild"); return;}



    let translated = await translate(message.content, {
            to: mainLang[0].iso,
    });

    //initalise the options for select menu and push the other option so it is at the bottom
    var options = [];
    var oopsie = false;
   if(translated == null || translated.text == null || translated.text.length ==0||translated.from.language.iso.toUpperCase()===mainLang[0].iso ) 
    {oopsie = true;}
    for(var i=0; i<langs.length; i++)
    {
        if(thisGuild[0].languages.includes(langs[i].display))
            {
                translatedminor = await translate(message.content, {
                    to: langs[i].iso,
                });
                options.push({label: langs[i].display, description: translatedminor.text.substring(0,100), emoji: langs[i].emoji, value: langs[i].iso});
        if(oopsie && langs[i].display=="english"){translated = translatedminor; mainLang[0] = langs[i]; if(translated == null || translated.text == null || translated.text.length ==0)return;}            
            }

    }

    const embed = new EmbedBuilder()
    .setDescription(`${mainLang[0].emoji} [${mainLang[0].display.toUpperCase()} Original](https://discordapp.com/channels/`+guildId+"/"+message.channel.id+"/"+message.id+" 'Click the Dropdown for other Languages')")
    .setColor('DarkVividPink')
    .setFooter({text:translated.text});
   // console.log(mainLang[0].display);
    options.push({label: 'Other', description: 'A language not in this list', value: 'other', emoji: '<:pngwing:1010986061167603834>'});


    const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('translate')
                    .setPlaceholder(options[0].description)
                    .addOptions(options),
            );


        let nickname = ``;
        if (`${message.member}` == undefined) {
                nickname = `${message.author.username}`;
        } else if (
                `${message.member.nick}` == `undefined` ||
                `${message.member.nick}` == `null`
        ) {
                nickname = `${message.author.username}`;
        } else {
                nickname = `${message.member.nick}`;
        }

            try {
                const webhooks = await channel.fetchWebhooks();
                var webhook = webhooks.find(wh => wh.token);
              //  console.log(webhook);

                if (!webhook) {
                    webhook=await channel.createWebhook({
                        name: 'Evielator',
                        avatar: 'https://imgur.com/khfBGAn',
                    });
                }

               await webhook.send({
                   // content: '.',
                    username: nickname,
                    avatarURL: message.author.avatar ?
                                            `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png` :
                                            'https://imgur.com/khfBGAn',
                    components: [row],
                    embeds: [embed],
                    flags: 4096
                });
            } 
        catch (error) {
        console.error('Error trying to send: ', error);
        message.reply({
        embeds: [embed],
        components: [row]});
    }
    }
}
}
