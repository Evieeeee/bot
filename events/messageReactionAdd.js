const { EmbedBuilder, Events, Partials } = require('discord.js');
const translate = require('@iamtraction/google-translate');
const langs = JSON.parse(process.env.languages);

// country code regex
const CC_REGEX = /^[a-z]{2}$/i;

// flag emoji use 2 regional indicator symbols, and each symbol is 2 chars
const FLAG_LENGTH = 4;

// offset between uppercase ascii and regional indicator symbols
const OFFSET = 127397;

async function emojiCountryCode(flag) {
  if (flag.length !== FLAG_LENGTH) {
	return 'NOTFLAG';
  }

  const codePoints = [...flag].map(c => c.codePointAt() - OFFSET);
  return String.fromCodePoint(...codePoints);
}


async function replaceISO (tolang) {
    
        if(tolang == `JP`){tolang =`JA`;}
        if(tolang== `KR`) {tolang =`KO`;}
        if(tolang == `CN`){tolang = `zh-CN`;}
        if(tolang==`WS`){tolang = `SM`;}
        if(tolang==`US`||tolang==`GB` ||tolang==`AU`||tolang==`UM`|| tolang==`NZ`){tolang =`EN`;}
        if(tolang==`UA`){tolang=`UK`;}
        if(tolang==`BR`){tolang=`PT`;}
        if(tolang==`CI`){tolang=`FR`;}
        if(tolang==`MX`){tolang=`ES`;}
        if(tolang == `RS`){tolang=`RU`;}
        if(tolang == `EA`){tolang=`ES`;}
        if(tolang == `CL`){tolang=`ES`;}
        if(tolang == `EC`){tolang=`ES`;}
        if(tolang == `HN`){tolang=`ES`;}
        if(tolang == `SA`){tolang=`AR`;}
        if(tolang == `VN`) {tolang=`VI`;}
        if(tolang == `AT`) {tolang=`DE`;}
    
    return tolang;
};

module.exports = {
	name: 'messageReactionAdd',
	async execute(messageReaction, user) {
	var error = false;
	var content = ``;
	if (messageReaction.partial) {
	// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
	try {
		await messageReaction.fetch();
	} catch (error) {
		console.error('Something went wrong when fetching the message:', error);
		// Return as `reaction.message.author` may be undefined/null
		return;
	}
	}
    const { message, emoji } = messageReaction;
      //  console.log(emoji);
    //if(!emoji.name.includes(`flag`)) return;
    let tolang = ``;
    try
        {
        tolang = await emojiCountryCode(emoji.name).catch(err => {error = true; content = err;});
	if(!CC_REGEX.test(tolang)){return;}
        tolang = await replaceISO(tolang);
        let translated = await translate(message.content, {
                to: tolang,
        }).catch(err => {error = true; content = `Your selected language ${tolang} is not supported currently, please message Evie#3007 to get it supported`;});

        mainLang = langs.filter(it => it.iso === tolang)
		
		if(mainLang.length ===0){error= true; content = `${tolang} is not properly configured, to fix contact Evie#3007, however here is your translation - \n ${translated.text}`;};
		if(!error)
		{
        const embed = new EmbedBuilder()
        .setDescription(`${mainLang[0].emoji} [${mainLang[0].display.toUpperCase()} Original](https://discordapp.com/channels/`+message.guildId+"/"+message.channelId+"/"+message.id+" 'Click the Dropdown for other Languages')")
    .setColor('DarkVividPink')
    .setFooter({text:translated.text});
        await user.send({embeds:[embed]});
        }
		else
		{
		const embederr = new EmbedBuilder()
        .setDescription(`Error`)
    .setColor('Red')
    .setFooter({text:content});
		user.send({embeds: [embederr]});
		}
	}
    catch (error) {console.log(emoji.name+ error);}
}}
