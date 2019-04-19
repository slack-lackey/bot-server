'use strict';

/**
 * Bot Router Module
 * @module src/bot/bot-router
 */

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

/******************************************************
---------- EVENTS ------------------------------------
******************************************************/

// Event handlers
const messageHandler = require('./events/message.js');
const fileCreatedHandler = require('./events/file-created.js');
const fileEditedHandler = require('./events/file-changed.js');

// Attach listeners to the event adapter
slackEvents.on('message', messageHandler);
slackEvents.on('file_created', fileCreatedHandler);
slackEvents.on('file_change', fileEditedHandler);

/******************************************************
---------- INTERACTIVE MESSAGES ----------------------
******************************************************/

// Interactive message action handlers
const handleSaveGistAction = require('./actions/save-gist.js');
const handleSaveGistSnippetAction = require('./actions/save-gist-snippet.js');
const handleDontSaveAction = require('./actions/dont-save.js');
const handleFamilyAction = require('./actions/family.js');
const handleHelpAction = require('./actions/help.js');
const handleShareGistAction = require('./actions/share-gist.js');

// Attach listeners to the interactive message adapter
slackInteractions.action({ actionId: 'save_gist' }, handleSaveGistAction);
slackInteractions.action({ actionId: 'save_gist_snippet' }, handleSaveGistSnippetAction);
slackInteractions.action({ actionId: 'dont_save' }, handleDontSaveAction);
slackInteractions.action({ actionId: 'family' }, handleFamilyAction);
slackInteractions.action({ actionId: 'help' }, handleHelpAction);
slackInteractions.action({ actionId: 'share_gist_to_channel' }, handleShareGistAction);


module.exports = botRouter;