'use strict';

require('dotenv').config();

const express = require('express');
const botRouter = express.Router();

const { createEventAdapter } = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages');

// Initialize interactive message adapter using signing secret from environment variables
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);

// Initialize event adapter using signing secret from environment variables
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET, {
  includeBody: true,
});

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

const messageHandler = require('./events/message.js');

// Listens for every "message" event
slackEvents.on('message', messageHandler);

const fileCreatedHandler = require('./events/file-created.js');

// Listens for every "file_created" event
slackEvents.on('file_created', fileCreatedHandler);


/***************************************************
---------- SLACK INTERACTIVE MESSAGES ----------
***************************************************/
// Attaches listeners to the interactive message adapter
// `payload` contains information about the action

const handleSaveGistAction = require('./actions/save-gist.js');

// ***** If block interaction "action_id" is "save_gist"
slackInteractions.action({ actionId: 'save_gist' }, handleSaveGistAction);

const handleSaveGistSnippetAction = require('./actions/save-gist-snippet.js');

// ***** If block interaction "action_id" is "save_gist_snippet"
slackInteractions.action({ actionId: 'save_gist_snippet' }, handleSaveGistSnippetAction);

const handleDontSaveAction = require('./actions/dont-save.js');

// ***** If block interaction "action_id" is "dont_save"
slackInteractions.action({ actionId: 'dont_save' }, handleDontSaveAction);

const handleFamilyAction = require('./actions/family.js');

// ***** If block interaction "action_id" is "family"
slackInteractions.action({ actionId: 'family' }, handleFamilyAction);

const handleHelpAction = require('./actions/help.js');

// ***** If block interaction "action_id" is "help"
slackInteractions.action({ actionId: 'help' }, handleHelpAction);

const handleShareGistAction = require('./actions/share-gist.js');

// ***** If block interaction "action_id" is "share_gist_to_channel"
slackInteractions.action({ actionId: 'share_gist_to_channel' }, handleShareGistAction);


module.exports = botRouter;
