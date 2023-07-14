/****************************************************
* Name: a file that will allow you to execute the one time functions of change bot status and send message
* Description: use to send messages from Evielator - and update her status - ideal for Customer Support and outages
* You will need to obtain the Channel id using your Discord application to use this widget.
* Please read the descriptions below to use this app <3
* Made by & contact for support : Evie
*****************************************************/

/******************Call send message*****************/
// Variables to change
const channel = ''; // the number reference to the channel you want to message (can be a dm)
const messageContent = ''; // the smaller text you want in the message
const colour = ''; // the colour you want the sidebar of the message
const description = ''; // the title you want on the message
const translate = ''; // does the message need a translation dropdown? ONLY use this on guilds that are set up for Evielator
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

    client.login('xxx');

executableFunction({ channel, messageContent, colour, description, translate });


async function executableFunction(args) {
    console.log('in function');

    const channelS = args.channel || '944747304802451467';
	const messageContent = args.messageContent|| (`Welcome to Plan It. We are a group of passionate people who are working on applications and Discord Bots aimed at making the game accessible and better for it's community.`+
			`\n\nIf you are an existing client and require support please click one of the links below:\n`+
			`#evielator-support\n`+`#transliteor-support\n`+`#wastelandapp-support\n\n`+
			`If you are a new client looking at one of our products please have a look at our website or feel free to chat to one of us in our sales room #sales-chat`+
			`\n\nWe look forward to helping you.`);
		const colour = args.colour || 'DarkVividPink';
		const description = args.description || "Welcome";
		const translationreqd = args.translate || false;

const embed = new EmbedBuilder()
		.setDescription(description)
		.setColor(colour)
		.setFooter({text:messageContent});


		let nickname = `Plan It Applications`;
	  //start translation  obj
	  var row;
	  if(translationreqd){
		const guildObj = JSON.parse(process.env.guilds);
		const langs = JSON.parse(process.env.languages);
		if(channel.guild)
		{
			const guildId = channel.guild.id;

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
			options.push({label: 'Other', description: 'A language not in this list', value: 'other', emoji: '<:pngwing:1010986061167603834>'});
			row = new ActionRowBuilder()
				.addComponents(
					new StringSelectMenuBuilder()
						.setCustomId('translate')
						.setPlaceholder(options[0].description)
						.addOptions(options),
				);
			}
		}
		else{row = null;}
		//end translation obj
		
		
if(row)
    client.on('ready', async () => {
        const toSend = await client.channels.cache.get(channelS);
	toSend.send({"embeds":[embed], "components":[row], "username":"Plan It"})
    });
else
	    client.on('ready', async () => {
        const toSend = await client.channels.cache.get(channelS);
	toSend.send({"embeds":[embed],  "username":"Plan It"})
    });
	
}
