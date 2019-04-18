'use strict';

// Load environment variables from `.env` file
require('dotenv').config();

/***************************************************
---------- APPLICATION DEPENDENCIES ----------
***************************************************/

const express = require('express');
// const superagent = require('superagent');
// const moment = require('moment');
// const cwd = process.cwd();

// const db = require('./database/gist-model.js');

// Slack APIs
// const { WebClient } = require('@slack/web-api');
// const { createEventAdapter } = require('@slack/events-api');
// const { createMessageAdapter } = require('@slack/interactive-messages');

// Dependencies for OAuth
// const passport = require('passport');
// const LocalStorage = require('node-localstorage').LocalStorage;
// const SlackStrategy = require('@aoberoi/passport-slack').default.Strategy;

// const blockOne = require('./blocks/block-1.json');
// const blockTwo = require('./blocks/block-2.json');
// const blockSuccess = require('./blocks/success.json');
// const aboutBlock = require('./blocks/about.json');
// const helpBlock = require('./blocks/help.json');

const auth = require('./auth/auth-router.js');
const botRouter = require('./bot/bot-router.js');


// const getClientByTeamId = require('./lib/get-client.js');


/***************************************************
---------- APPLICATION SETUP ----------
***************************************************/

// Initialize an Express application
const app = express();

// // Initialize interactive message adapter using signing secret from environment variables
// const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);

// // Initialize event adapter using signing secret from environment variables
// const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET, {
//   includeBody: true,
// });


// // Initialize a Local Storage object to store authorization info
// // NOTE: This is an insecure method and thus for demo purposes only!
// const botAuthorizationStorage = new LocalStorage(`${cwd}/storage`);



// /***************************************************
// ---------- HELPER FUNCTIONS ----------
// ***************************************************/

// Helpers to cache and lookup appropriate client
// NOTE: Not enterprise-ready. if the event was triggered inside a shared channel, this lookup
// could fail but there might be a suitable client from one of the other teams that is within that
// shared channel.
// const clients = {};
// function getClientByTeamId(teamId) {
//   if (!clients[teamId] && botAuthorizationStorage.getItem(teamId)) {
//     clients[teamId] = new WebClient(botAuthorizationStorage.getItem(teamId));
//   }
//   if (clients[teamId]) {
//     return clients[teamId];
//   }
//   return null;
// }

app.use(auth);
app.use(botRouter);

//------------------------------------
// // *** Plug the event adapter into the express app as middleware ***
// // Corresponds to the "Request URL" in App Dashboard > Features > Event Subscriptions
// // Ex: https://your-deployed-bot.com/slack/events
// app.use('/slack/events', slackEvents.expressMiddleware());

// // *** Plug the interactive message adapter into the express app as middleware ***
// // Corresponds to the "Request URL" in App Dashboard > Features > Interactive Components
// // Ex: https://your-deployed-bot.com/slack/actions
// app.use('/slack/actions', slackInteractions.requestListener());


// /***************************************************
// ---------- SLACK CHANNEL EVENT LISTENERS ----------
// ***************************************************/
// // Attaches listeners to the event adapter 

// // Listens for every "message" event
// slackEvents.on('message', (message, body) => {
//   // console.log('heard message:', message);
//   // console.log('message body:', body);


//   // ***** If message contains 3 backticks, asks if user wants to save a Gist with buttons
//   if (!message.subtype && message.text.indexOf('```') >= 0) {

//     // Get the user's display name
//     const slack = getClientByTeamId(body.team_id);
//     let token = botAuthorizationStorage.getItem(body.team_id);
//     return slack.users.info({
//       "token": token,
//       "user": message.user,
//     })


//       // Send a message and buttons to save/not save to the user
//       // entire message object is passed in as the "value" of the "save" button
//       .then(res => {
//         // attach display name to the message object
//         message.username = res.user.profile.display_name;

//         // use block template from JSON file, add value and action_id
//         let block = blockOne;
//         block.blocks[0].elements[0].value = JSON.stringify(message);
//         block.blocks[0].elements[0].action_id = 'save_gist';

//         slack.chat.postEphemeral({
//           token: token,
//           channel: message.channel,
//           text: `Hey, <@${message.user}>, looks like you pasted a code block. Want me to save it for you as a Gist? :floppy_disk:`,
//           user: message.user,
//           attachments: [
//             block,
//           ],
//         });
//       });

//   }

//   // ***** If message contains "get my gists", send back a link from the GitHub API
//   if (!message.subtype && message.text.indexOf('get my gists') >= 0) {
//     const slack = getClientByTeamId(body.team_id);
//     let token = botAuthorizationStorage.getItem(body.team_id);

//     db.get()
//       .then(res => {
//         let result = '';
//         res.forEach(item => {
//           console.log(item);
//           console.log('message', message);
//           if (item.user === message.user) {
//             result += item.url + '\n';
//           }
//         });
//         return result;
//       })
//       .then(result => {
//         slack.chat.postEphemeral({
//           token: token,
//           channel: message.channel,
//           text: 'Your gists are here: ' + result,
//           user: message.user,
//         });

//       })


//       .catch(err => console.log(err));
//   }

//   // ***** If message contains "family", send back a the "about-block" contents
//   if (!message.subtype && message.text.indexOf('family') >= 0) {
//     const slack = getClientByTeamId(body.team_id);
//     let token = botAuthorizationStorage.getItem(body.team_id);

//     let block = aboutBlock;

//     slack.chat.postEphemeral({
//       token: token,
//       channel: message.channel,
//       text: '',
//       user: message.user,
//       blocks: block,
//     });
//   }

//   // ***** If message contains "<bot_id> help", send back a the "help" block contents
//   if (!message.subtype && message.text.indexOf('<@UHZ3J65K9> help') >= 0) {
//     console.log('asked for help');
//     console.log('MeSSAGE:', message);

//     const slack = getClientByTeamId(body.team_id);
//     let token = botAuthorizationStorage.getItem(body.team_id);

//     let block = helpBlock;

//     slack.chat.postEphemeral({
//       token: token,
//       channel: message.channel,
//       text: '',
//       user: message.user,
//       blocks: block,
//     });
//   }

// });

// slackEvents.on('file_created', (fileEvent, body) => {
//   console.log('file was created 196');
//   console.log('fileEvent', fileEvent);

//   const slack = getClientByTeamId(body.team_id);
//   let token = botAuthorizationStorage.getItem(body.team_id);

//   return slack.files.info({
//     "token": token,
//     "file": fileEvent.file_id,
//   })
//     .then(file => {
//       console.log('210 mode', file.file.mode);
//       if (file.file.mode === 'snippet') {
//         // use block template from JSON file, add value and action_id
//         let block = blockOne;
//         block.blocks[0].elements[0].value = fileEvent.file_id;
//         block.blocks[0].elements[0].action_id = 'save_gist_snippet';

//         // Send a message and buttons to save/not save to the user
//         // entire message object is passed in as the "value" of the "save" button
//         slack.chat.postEphemeral({
//           token: token,
//           channel: file.file.channels[0],
//           text: `Hey, <@${file.file.user}>, looks like you pasted a code snippet. Want me to save it for you as a Gist? :floppy_disk:`,
//           user: file.file.user,
//           attachments: [
//             block,
//           ],
//         });
//       }
//     })
//     .catch(err => console.error(err));

// });

// /***************************************************
// ---------- SLACK INTERACTIVE MESSAGES ----------
// ***************************************************/
// // Attaches listeners to the interactive message adapter
// // `payload` contains information about the action
// // Block Kit Builder can be used to explore the payload shape for various action blocks:
// // https://api.slack.com/tools/block-kit-builder

// // ***** If block interaction "action_id" is "save_gist"
// slackInteractions.action({ actionId: 'save_gist' }, (payload, respond) => {

//   // Get the original message object (with the future Gist's content)
//   const message = JSON.parse(payload.actions[0].value);

//   // Make an object to send to the API server to save a Gist
//   let title = message.username.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now() + '.js';
//   let description = `Created by ${message.username} on ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`;
//   let content = message.text.slice(message.text.indexOf('```') + 3, message.text.lastIndexOf('```'));
//   const gist = { title, description, content };

//   console.log('gist to send:', gist);

//   // POST request to hosted API server which saves a Gist and returns a URL
//   return superagent.post(`${process.env.BOT_API_SERVER}/createGist`)
//     .send(gist)
//     .then((res) => {

//       let db = require('./database/gist-model.js');
//       let obj = {
//         title: title,
//         author: message.username,
//         date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
//         channel: message.channel,
//         keywords: message.keywords,
//         user: message.user,
//         url: res.text,
//       };
//       db.post(obj);

//       let block = blockSuccess;
//       block[0].text.text = '*I saved your Gist!*\n\nHere is your URL if you want to share it with others.\n\n' + res.text + '\n\n';

//       block[5].elements[0].value = res.text;


//       respond({
//         blocks: block,
//         replace_original: true,
//       });

//       respond({
//         text: 'I saved it as a gist for you. You can find it here:\n' + res.text,
//         replace_original: true,
//       });
//     })
//     .catch((error) => {
//       respond({ text: 'Sorry, there\'s been an error. Try again later.', replace_original: true });
//     });

// });


// // ***** If block interaction "action_id" is "save_gist_snippet"
// slackInteractions.action({ actionId: 'save_gist_snippet' }, (payload, respond) => {

//   let file_id = payload.actions[0].value;
//   console.log('file ID:', file_id);

//   const slack = getClientByTeamId(payload.user.team_id);
//   let token = botAuthorizationStorage.getItem(payload.user.team_id);

//   return slack.files.info({
//     "token": token,
//     "file": file_id,
//   })
//     .then(file => {
//       // Get the user's display name and attach to the file object
//       return slack.users.info({
//         "token": token,
//         "user": file.file.user,
//       })
//         .then(res => {
//           file.username = res.user.profile.display_name;

//           // Make an object to send to the API server to save a Gist
//           let title;
//           if (file.file.name[0] === '-') {
//             title = file.username.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now() + '.' + file.file.name.split('.').pop();
//           } else {
//             title = file.file.name;
//           }
//           let description = `Created by ${file.username} on ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`;
//           let content = file.content;
//           const gist = { title, description, content };

//           console.log('gist to send:', gist);

//           // POST request to hosted API server which saves a Gist and returns a URL
//           return superagent.post(`${process.env.BOT_API_SERVER}/createGist`)
//             .send(gist)
//             .then((res) => {

//               let obj = {
//                 title: title,
//                 author: file.username,
//                 date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
//                 channel: payload.channel.id,
//                 // keywords: message.keywords,
//                 user: payload.user.id,
//                 url: res.text,
//               };
//               console.log('******* OBJ TO SAVE TO DB:', obj);
//               db.post(obj);


//               let block = blockSuccess;
//               block[0].text.text = '*I saved your Gist!*\n\nHere is your URL if you want to share it with others.\n\n' + res.text + '\n\n';
//               // block[1].elements[0].url = res.text;

//               respond({
//                 blocks: block,
//                 replace_original: true,
//               });
//             })
//             .catch((error) => {
//               respond({ text: 'Sorry, there\'s been an error. Try again later.', replace_original: true });
//             });
//         });
//     })
//     .catch(err => console.error('ERROR on line 336', err));
// });

// slackInteractions.action({ actionId: 'dont_save' }, (payload, respond) => {
//   respond({
//     text: `Ok, I won't save it. If you change your mind, send your code (as a snippet or inside 3 backticks) to this channel again.`,
//     replace_original: true,
//   });
// });

// slackInteractions.action({ actionId: 'family' }, (payload, respond) => {
//   let block = aboutBlock;
//   respond({
//     blocks: block,
//     replace_original: true,
//   });
// });

// slackInteractions.action({ actionId: 'help' }, (payload, respond) => {
//   let block = helpBlock;
//   respond({
//     blocks: block,
//     replace_original: true,
//   });
// });

// slackInteractions.action({ actionId: 'share_gist_to_channel' }, (payload, respond) => {
//   console.log('********** PAYLOAD:', payload);


//   const slack = getClientByTeamId(payload.team.id);
//   let token = botAuthorizationStorage.getItem(payload.team.id);

//   slack.chat.postMessage({
//     token: token,
//     channel: payload.channel.id,
//     text: '<@' + payload.user.id + '> shared this Gist with the channel:\n' + payload.actions[0].value,
//   });

//   // block[5].elements[0].value = res.text;


//   // respond({
//   //   text: 'Hey everyone, this is visible!',
//   //   replace_original: true,
//   // });

//   // return {
//   //   text: 'Hey everyone, this is visible!',
//   // };

// });

//-------------------------------------------------------------------

// *** Handle Event API errors ***
// slackEvents.on('error', (error) => {
//   if (error.code === slackEventsApi.errorCodes.TOKEN_VERIFICATION_FAILURE) {
//     // This error type also has a `body` propery containing the request body which failed verification.
//     console.error(`An unverified request was sent to the Slack events Request URL. Request body: \
// ${JSON.stringify(error.body)}`);
//   } else {
//     console.error(`An error occurred while handling a Slack event: ${error.message}`);
//   }
// });


// Start the express application
// console.log('server.js clients', clients);
module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
  },
};
