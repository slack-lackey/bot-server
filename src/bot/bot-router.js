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

module.exports = botRouter;
