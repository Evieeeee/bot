const { EmbedBuilder, Events } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const translate = require('@iamtraction/google-translate');
const langs = JSON.parse(process.env.languages);



module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
	    await interaction.deferUpdate({ephemeral: true});
    	await wait(1000);

   		if (interaction.customId === `translate` || interaction.customId === `translate2`) 
   		{
	        selected = interaction.values[0];
	        const regex = /(?:https:\/\/discordapp.com\/channels\/)\d+\/\d+\/(\d+)/gm;
	        const match = regex.exec(interaction.message.embeds[0].description);
	        const originalMessageId = match[1];

	        if(selected=== 'other')
	        {
            const locales = {
                ja: `こんにちは、メッセージが欲しい言語を教えてください`+
                `（https://discordapp.com/channels/${interaction.guildId}/${interaction.channelId}/${originalMessageId}）`+
                `Google Cloud Translate Engineにあるあらゆる言語で、ここで見つけることができます：https：//cloud.google.com/translation-hub/docs/supported-languages「ISO」または言語の名前で返信するだけで、私はあなたを接続します`,

                ko: `안녕하세요, 메시지를 원하는 언어를 알려주세요.(https://discordapp.com/channels/${interaction.guildId}/${interaction.channelId}/${originalMessageId}).Google Cloud Translate Engine에있는 모든 언어로 문의 할 수 있습니다."ISO"또는 언어 이름으로 답장하면 연결하겠습니다.`,

                ru: `Привет, пожалуйста, скажите мне, какой язык вы хотите(https://discordapp.com/channels/${interaction.guildId}/${interaction.channelId}/${originalMessageId})Я могу говорить на любом языке, который находится на двигателе Translate Google, вы можете найти здесь: https://cloud.google.com/translation-hub/docs/supported-languages Просто ответьте с «ISO» или названием языка, и я вас подключу`,


                fr: `Salut, s'il vous plaît dites-moi quelle langue vous voulez le message`+
                `(https://discordapp.com/channels/${interaction.guildId}/${interaction.channelId}/${originalMessageId}) pour `+
                `être dans.Je peux parler dans n'importe quelle langue qui se trouve sur le moteur Google Cloud Translate que vous pouvez trouver `+
                `ici: https://cloud.google.com/translation-hub/docs/Supported-LanguagesRépondez simplement avec l'iso "ou le nom de la langue et je vais vous accrocher`,

                de: `Hallo, bitte sag mir, welche Sprache du die Nachricht willst`+
                `(https://discordapp.com/channels/${interaction.guildId}/${interaction.channelId}/${originalMessageId})`+
                ` zu sein.Ich kann in jeder Sprache sprechen, die sich in der Google Cloud Translate Engine befindet, die Sie hier `+
                `finden können: https://cloud.google.com/translation-hub/docs/supported-languages Antworte einfach mit dem "ISO" oder dem Namen der Sprache und ich werde dich anschließen`,
            };
            interaction.user.send({content:locales[interaction.locale] ?? `Hi there, please tell me which language you want the message`+
            ` (https://discordapp.com/channels/${interaction.guildId}/${interaction.channelId}/${originalMessageId}) to be in.`+
            `\n I can talk in any language that's on the Google Cloud translate engine you can find here: https://cloud.google.com/translation-hub/docs/supported-languages`+
            `, Just reply with the "ISO" or the name of the language and I'll hook you up`});
        }
        else
        {
            let originalMessage = await interaction.channel.messages.fetch(originalMessageId)
            .then(message => messageCont=message.content)
            .catch(console.error);

            let selectedTrans = await translate(originalMessage, {
            to: selected,
            });

            var langObj = await langs.filter(it => it.iso === selected);

            const selectEmbed = await new EmbedBuilder()
            .setDescription(langObj[0].emoji+` [`+ langObj[0].display.toUpperCase()+` Original](https://discordapp.com/channels/`+interaction.guildId+"/"+interaction.channel.id+"/"+originalMessageId+" 'Click the Dropdown for other Languages')")
            .setColor('DarkPurple')
            .setFooter({text:selectedTrans.text});
        try{await interaction.editReply({ embeds: [selectEmbed]});
}
        catch(err){					
interaction.channel.send({ embeds: [selectEmbed], ephemeral: true })}
        }
    }    
	},
};