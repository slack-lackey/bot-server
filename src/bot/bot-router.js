'use strict';

require('dotenv').config();
const cwd = process.cwd();
const superagent = require('superagent');
const moment = require('moment');

const express = require('express');
const botRouter = express.Router();
const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages');
const LocalStorage = require('node-localstorage').LocalStorage;

const botAuthorizationStorage = new LocalStorage(`${cwd}/storage`);

const blockOne = require('../blocks/block-1.json');
const blockSuccess = require('../blocks/success.json');
const aboutBlock = require('../blocks/about.json');
const helpBlock = require('../blocks/help.json');
const db = require('../database/gist-model.js');
const randomGif = require('../lib/random-gif.js');


// Initialize interactive message adapter using signing secret from environment variables
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);

// Initialize event adapter using signing secret from environment variables
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET, {
  includeBody: true,
});


const clients = {};
function getClientByTeamId(teamId) {
  if (!clients[teamId] && botAuthorizationStorage.getItem(teamId)) {
    clients[teamId] = new WebClient(botAuthorizationStorage.getItem(teamId));
  }
  if (clients[teamId]) {
    return clients[teamId];
  }
  return null;
}

// *** Plug the event adapter into the express app as middleware ***
// Corresponds to the "Request URL" in App Dashboard > Features > Event Subscriptions
// Ex: https://your-deployed-bot.com/slack/events
botRouter.use('/slack/events', slackEvents.expressMiddleware());

// *** Plug the interactive message adapter into the express app as middleware ***
// Corresponds to the "Request URL" in App Dashboard > Features > Interactive Components
// Ex: https://your-deployed-bot.com/slack/actions
botRouter.use('/slack/actions', slackInteractions.requestListener());


/***************************************************
---------- SLACK CHANNEL EVENT LISTENERS ----------
***************************************************/
// Attaches listeners to the event adapter 

// Listens for every "message" event
slackEvents.on('message', (message, body) => {

  // ***** If message contains 3 backticks, asks if user wants to save a Gist with buttons
  if (!message.subtype && message.text.indexOf('```') >= 0) {

    // get correct web client
    const slack = getClientByTeamId(body.team_id);
    // get token from local storage
    let token = botAuthorizationStorage.getItem(body.team_id);

    // get full user object to grab their display name
    slack.users.info({ 'token': token, 'user': message.user })
      .then(userObj => {
        // add display name to message
        message.username = userObj.user.profile.display_name;

        // get block, add full message and change "save" button's action_id
        let block = blockOne;
        block.blocks[0].elements[0].value = JSON.stringify(message);
        block.blocks[0].elements[0].action_id = 'save_gist';

        // Send a "Visible only to you" message with "save"/"don't save" buttons
        slack.chat.postEphemeral({
          token: token,
          channel: message.channel,
          text: `Hey, <@${message.user}>, looks like you pasted a code block. Want me to save it for you as a Gist? :floppy_disk:`,
          user: message.user,
          attachments: [block],
        });
      });
  }

  // ***** If message contains "get my gists", send back a link from the GitHub API
  if (!message.subtype && message.text.indexOf('get my gists') >= 0) {
    const slack = getClientByTeamId(body.team_id);
    let token = botAuthorizationStorage.getItem(body.team_id);

    // find all gist links matching the user's id
    db.get()
      .then(res => {
        let result = '';
        res.forEach(item => {
          if (item.user === message.user) {
            result += item.url + '\n';
          }
        });
        return result;
      })

      // Send a "Visible only to you" messsage with all of the user's gist links
      .then(result => {
        slack.chat.postEphemeral({
          token: token,
          channel: message.channel,
          text: 'Your gists are here: ' + result,
          user: message.user,
        });
      })

      .catch(err => console.error(err));
  }

  // ***** If message contains "<bot_id> help", send back a the "help" block contents
  if (!message.subtype && message.text.indexOf('<@UHZ3J65K9> help') >= 0) {
    const slack = getClientByTeamId(body.team_id);
    let token = botAuthorizationStorage.getItem(body.team_id);

    let block = helpBlock;

    // Send a "Visible only to you" messsage with the "help" block
    slack.chat.postEphemeral({
      token: token,
      channel: message.channel,
      text: '',
      user: message.user,
      blocks: block,
    });
  }

});

slackEvents.on('file_created', (fileEvent, body) => {

  const slack = getClientByTeamId(body.team_id);
  let token = botAuthorizationStorage.getItem(body.team_id);

  return slack.files.info({ 'token': token, 'file': fileEvent.file_id })
    .then(file => {

      // only acts on created snippets
      if (file.file.mode === 'snippet') {

        // get block, add file id and change "save" button's action_id
        let block = blockOne;
        block.blocks[0].elements[0].value = fileEvent.file_id;
        block.blocks[0].elements[0].action_id = 'save_gist_snippet';

        // Send a "Visible only to you" message with "save"/"don't save" buttons
        slack.chat.postEphemeral({
          token: token,
          channel: file.file.channels[0],
          text: `Hey, <@${file.file.user}>, looks like you pasted a code snippet. Want me to save it for you as a Gist? :floppy_disk:`,
          user: file.file.user,
          attachments: [
            block,
          ],
        });
      }
    })

    .catch(err => console.error(err));

});

/***************************************************
---------- SLACK INTERACTIVE MESSAGES ----------
***************************************************/
// Attaches listeners to the interactive message adapter
// `payload` contains information about the action

// ***** If block interaction "action_id" is "save_gist"
slackInteractions.action({ actionId: 'save_gist' }, (payload, respond) => {

  // Get the original message object (with the future Gist's content)
  const message = JSON.parse(payload.actions[0].value);

  // Make an object to send to the API server to save a Gist
  let title = message.username.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now() + '.js';
  let description = `Created by ${message.username} on ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`;
  let content = message.text.slice(message.text.indexOf('```') + 3, message.text.lastIndexOf('```'));
  const gist = { title, description, content };

  // POST request to hosted API server which saves a Gist and returns a URL
  return superagent.post(`${process.env.BOT_API_SERVER}/createGist`)
    .send(gist)
    .then((res) => {

      let obj = {
        title: title,
        author: message.username,
        date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
        channel: message.channel,
        keywords: message.keywords,
        user: message.user,
        url: res.text,
      };

      db.post(obj);

      let block = blockSuccess;
      block[0].text.text = '*I saved your Gist!*\n\nHere is your URL if you want to share it with others.\n\n' + res.text + '\n\n';
      block[5].elements[0].value = res.text;
      // pick a random "success" gif
      block[2].image_url = randomGif();

      respond({
        blocks: block,
        replace_original: true,
      });

      respond({
        text: 'I saved it as a gist for you. You can find it here:\n' + res.text,
        replace_original: true,
      });

    })

    .catch((error) => {
      respond({ text: 'Sorry, there\'s been an error. Try again later.', replace_original: true });
    });

});

// ***** If block interaction "action_id" is "save_gist_snippet"
slackInteractions.action({ actionId: 'save_gist_snippet' }, (payload, respond) => {

  let file_id = payload.actions[0].value;

  const slack = getClientByTeamId(payload.user.team_id);
  let token = botAuthorizationStorage.getItem(payload.user.team_id);
  let file;

  slack.files.info({ 'token': token, 'file': file_id })
    .then((fileObj) => {
      file = fileObj;
      return slack.users.info({ 'token': token, 'user': file.file.user });
    })
    .then(userObj => {

      file.username = userObj.user.profile.display_name;

      // Make an object to send to the API server to save a Gist
      let title;
      if (file.file.name[0] === '-') {
        title = file.username.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now() + '.' + file.file.name.split('.').pop();
      } else {
        title = file.file.name;
      }
      let description = `Created by ${file.username} on ${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')}`;
      let content = file.content;
      const gist = { title, description, content };

      // POST request to hosted API server which saves a Gist and returns a URL
      return superagent.post(`${process.env.BOT_API_SERVER}/createGist`).send(gist)
        .then((res) => {

          let obj = {
            title: title,
            author: file.username,
            date: moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
            channel: payload.channel.id,
            // keywords: message.keywords,
            user: payload.user.id,
            url: res.text,
          };

          db.post(obj);

          let block = blockSuccess;
          block[0].text.text = '*I saved your Gist!*\n\nHere is your URL if you want to share it with others.\n\n' + res.text + '\n\n';
          // pick a random "success" gif
          block[2].image_url = randomGif();

          respond({
            blocks: block,
            replace_original: true,
          });

        })

        .catch((error) => {
          respond({ text: 'Sorry, there\'s been an error. Try again later.', replace_original: true });
        });

    });

});

// ***** If block interaction "action_id" is "dont_save"
slackInteractions.action({ actionId: 'dont_save' }, (payload, respond) => {
  respond({
    text: `Ok, I won't save it. If you change your mind, send your code (as a snippet or inside 3 backticks) to this channel again.`,
    replace_original: true,
  });
});

// ***** If block interaction "action_id" is "family"
slackInteractions.action({ actionId: 'family' }, (payload, respond) => {
  let block = aboutBlock;
  respond({
    blocks: block,
    replace_original: true,
  });
});

// ***** If block interaction "action_id" is "help"
slackInteractions.action({ actionId: 'help' }, (payload, respond) => {
  let block = helpBlock;
  respond({
    blocks: block,
    replace_original: true,
  });
});

// ***** If block interaction "action_id" is "share_gist_to_channel"
slackInteractions.action({ actionId: 'share_gist_to_channel' }, (payload, respond) => {

  const slack = getClientByTeamId(payload.team.id);
  let token = botAuthorizationStorage.getItem(payload.team.id);

  slack.chat.postMessage({
    token: token,
    channel: payload.channel.id,
    text: '<@' + payload.user.id + '> shared this Gist with the channel:\n' + payload.actions[0].value,
  });

});


module.exports = botRouter;
