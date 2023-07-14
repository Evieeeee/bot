const { Client, GatewayIntentBits, EmbedBuilder, channel } = require('discord.js');

module.exports={
	
		console.log('in function');
		client = new Client({ intents: [GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages]});

		client.login('xxx');

		channelS = args.channel || 944747304802451467;
		console.log(channelS);
		
		client.on('ready', client => {
		const tosend = await client.channels.cache.get(channelS);
		tosend.send('Hello here!');
		})
	}

		//this will use default values if the args are not provided
		
	/*	const channel = client.channels.cache.get(channelS).catch(err => {console.log("FUCK")}); // Default Plan It channel
		console.log(channel);
		const messageContent = args.messageContent|| (`Welcome to Plan It. We are a group of passionate people who are working on applications and Discord Bots aimed at making the game accessible and better for it's community.`+
			`\n\nIf you are an existing client and require support please click one of the links below:\n`+
			`#evielator-support\n`+`#transliteor-support\n`+`#wastelandapp-support\n\n`+
			`If you are a new client looking at one of our products please have a look at our website or feel free to chat to one of us in our sales room #sales-chat`+
			`\n\nWe look forward to helping you.`);
		const colour = args.colour || 'DarkVividPink';
		const description = args.description || "Welcome";
		const translationreqd = args.translate || false;
		  //initalise the options for select menu and push the other option so it is at the bottom
		
		const embed = new EmbedBuilder()
		.setDescription(description)
		.setColor(colour)
		.setFooter({text:messageContent});


		let nickname = `Plan It Applications`;
	  //start translation  obj
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
			const row = new ActionRowBuilder()
				.addComponents(
					new StringSelectMenuBuilder()
						.setCustomId('translate')
						.setPlaceholder(options[0].description)
						.addOptions(options),
				);
			}
		}
		//end translation obj


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
						embeds: [embed],
						components: [row]??null,
						flags: 4096
					});
				} 
			catch (error) {
			console.error('Error trying to send: ', error);
			channel.createMessage({
				channelId: channel.id,
			components: [row]??null, 
			embeds: [embed]})
			}
    
	}
}*/
