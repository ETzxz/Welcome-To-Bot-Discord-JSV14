const { Client , ButtonBuilder, GatewayIntentBits ,  Partials ,ButtonStyle, EmbedBuilder  , ActionRowBuilder , StringSelectMenuBuilder , ActivityType  } = require('discord.js');
const { WelcomeLeave } = require("canvafy");


const client = new Client({
    intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.GuildMessageReactions,
          GatewayIntentBits.GuildVoiceStates
        ],
  
    Partials: [
          Partials.Message,
          Partials.Reaction,
          Partials.User,
          Partials.Channel,
          Partials.GuildMember,
          Partials.ThreadMember,
          Partials.GuildScheduledEvent,
      ],
      allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
  });


  module.exports = client;



//token của bot
TOKEN = "" 
// kênh chứa tin nhắn khi có người vô
SEND  = "" 
///Role cho Select
ROLE1 = "" 
ROLE2 = ""
ROLE3 = ""
//role được quyền nhấn vào button welcome
rolebutton = "" 
msg = 
`
#  nhập vào tin nhắn  bạn muốn gửi trong embed
`



client.on('ready', async () => {
    let botStatus = `Code By etxzx`;
    client.user.setActivity(botStatus, { type: ActivityType.Streaming, url: 'https://www.twitch.tv/mixigaming' });
     console.log(`Đã kết nối tới ${client.user.tag}`);
});


client.on('guildMemberAdd', async member => {
    const wlcchannel = member.guild.channels.cache.get(SEND);
    let wlcbutton = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('wlcbutton').setEmoji('1195775436479795302').setLabel('Welcome')
    );
    let wlcdisabled = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('wlcbuttonn').setEmoji('1195775436479795302').setLabel('Welcome').setDisabled(true)
    );  

    const wlcss = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder().setCustomId(`wlcs`).setPlaceholder('Bạn có muốn chọn vai trò không?')
      .addOptions([
            {
                label: 'Trai xinh',
                value: "NAM",
                emoji: '1196426476489293935',
            },
            {
                label: 'Gái xinh',
                value: "NU",
                emoji: '1196426491538456676',
            },
            {
                label: 'LBGT',
                value: "GAY",
                emoji: '1196426512010838056',
            },
        
        ])

);          

const en = new ActionRowBuilder().addComponents(
  new StringSelectMenuBuilder().setCustomId(`hh6`).setPlaceholder(`ÔI không đã hết thời gian chọn role rồi`)
   .addOptions([
     {
       label: `Đã hết thời gian `,
       value: `h10`,
     } 
   ])
  .setDisabled(true)
)

  
    const anh = await new WelcomeLeave()
      .setAvatar(member.user.displayAvatarURL({ format: 'png' }))
      .setBackground("image", "https://images-ext-2.discordapp.net/external/I6HMfLj-KiFhEhayi0SN40H_UO-7ezqo52vWT7rnCog/%3Fsize%3D4096/https/cdn.discordapp.com/banners/931571593765851136/a_9ffc3b7f3d95144d95e18d6ada79f291.gif")
      .setTitle("Welcome")
      .setDescription("Welcome to Ten sv")
      .setBorder("#2a2e35")
      .setAvatarBorder("#2a2e35")
      .setOverlayOpacity(0.3)
      .build();
  
    const wlcembed = new EmbedBuilder()
     .setThumbnail(member.user.displayAvatarURL({ format: 'png' }))    
       .setImage(`attachment://welcome-${member.id}.png`)
      .setDescription(msg)
      .setTimestamp()
      .setColor('#2f3136');
  
    if (!wlcchannel) return;
    const mess = await wlcchannel.send({
      content: `<@${member.user.id}>`,
      components: [wlcbutton , wlcss],
      embeds: [wlcembed],
      files: [{ attachment: anh, name: `welcome-${member.id}.png` }]
    });
  
    const filter = (interaction) => interaction.user.id !== client.user.id;
    const collector = mess.createMessageComponentCollector({ filter, time: 1800000 });

  
    collector.on('collect', async (interaction) => {
      if (interaction.customId === 'wlcbutton') {
        const member = interaction.member;
        if (!member.roles.cache.has(rolebutton)) {
          await interaction.reply({ content: `Bạn cần phải có role <@&${rolebutton}>`, ephemeral: true });
          return;
        }
        mess.edit({
          components: [wlcdisabled , wlcss]
        });
        await interaction.deferUpdate();
        await interaction.followUp({
          content: `<a:HEAVEN_ghostheart:1119503186668048404> Welcome new member! to the server ${interaction.guild.name}\n\n*Bạn được chào đón bởi ${interaction.user.username}*\n\n> ✿﹒<a:HEAVEN_HEART2:1119503154308984912> Hãy vào <#1194151281653203035> để chọn những vai trò phù hợp với bản thân\n\n> ◠◠﹕<a:HEAVEN_heart:1119503169043562548> Và hãy đọc <#1151558602142789683>  để tránh vi phạm luật của máy chủ\n\n\chúc bạn có 1 ngày tốt lành`,
        });
      }
      if (!interaction.isMessageComponent()) return; 
      if (interaction.customId === 'wlcs') { 
        let choice = interaction.values[0];
        const member = interaction.member;
    
        if (choice === 'NAM') {
          if (member.roles.cache.some(role => role.id === ROLE1)) {
            await interaction.reply({ content: `Đã xóa vai trò  <@&${ROLE1}> cho bạn`, ephemeral: true });
            member.roles.remove(ROLE1);
          } else {
            member.roles.add(ROLE1);
            await interaction.reply({ content: `Đã thêm vài trò <@&${ROLE1}> vào bạn `, ephemeral: true });
          }
        } else if (choice === 'NU') {
          if (member.roles.cache.some(role => role.id === ROLE2)) {
            await interaction.reply({ content: `Đã xóa vai trò <@&${ROLE2}> cho bạn  `, ephemeral: true });
            member.roles.remove(ROLE2);
          } else {
            member.roles.add(ROLE2);
            await interaction.reply({ content: `Đã thêm vài trò vào bạn <@&${ROLE2}> vào bạn`, ephemeral: true });
          }
        }  else if (choice === 'GAY') {
          if (member.roles.cache.some(role => role.id === ROLE3)) {
            await interaction.reply({ content: `Đã xóa vai trò <@&${ROLE3}> cho bạn`, ephemeral: true });
            member.roles.remove(ROLE3);
          } else {
            member.roles.add(ROLE3);
            await interaction.reply({ content: `Đã thêm vài trò vào bạn <@&${ROLE3}> vào bạn`, ephemeral: true });
          }
        }
      }
    });


    collector.on('end',async() => {
      mess.edit({embeds : [wlcembed] , components : [wlcdisabled ,en]})
  });

  });


  process.on("unhandledRejection",(err) => {
    console.error(err)
  });
  process.on("uncaughtException",(er) => {
    console.error(er)
  })


  client.login(TOKEN)
