'use strict';

/**
 * Auth Router Module
 * Connects app to Slack API through OAuth using the Client ID and Secret
 * @module src/auth/auth-router
 */

require('dotenv').config();

const express = require('express');
const authRouter = express.Router();
const cwd = process.cwd();

// Dependencies for OAuth
const passport = require('passport');
const LocalStorage = require('node-localstorage').LocalStorage;
const SlackStrategy = require('@aoberoi/passport-slack').default.Strategy;

// Initialize a Local Storage object to store authorization info
// NOTE: This is an insecure method and thus for demo purposes only!
const botAuthorizationStorage = new LocalStorage(`${cwd}/storage`);

/***************************************************
---------- OAUTH MIDDLEWARE & ROUTES ----------
***************************************************/
// See docs for OAuth 2.0 in Slack
// https://api.slack.com/docs/oauth

// Initialize Add to Slack (OAuth) helpers
passport.use(new SlackStrategy({
  clientID: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  skipUserProfile: true,
}, (accessToken, scopes, team, extra, profiles, done) => {
  botAuthorizationStorage.setItem(team.id, extra.bot.accessToken);
  done(null, {});
}));

// Plug the Add to Slack (OAuth) helpers into the express app
authRouter.use(passport.initialize());

// Route for "Add to Slack" button needed to complete app/bot installation
authRouter.get('/', (req, res) => {
  res.send('<a href="/auth/slack"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>');
});

authRouter.get('/auth/slack', passport.authenticate('slack', {
  scope: ['bot'],
}));

// Corresponds to a "Redirect URL" in App Dashboard > Features > OAuth & Permissions
authRouter.get('/auth/slack/callback',
  passport.authenticate('slack', { session: false }),
  (req, res) => {
    res.send('<p>Slack Lackey was successfully installed on your team.</p>');
  },
  (err, req, res, next) => {
    res.status(500).send(`<p>Slack Lackey failed to install</p> <pre>${err}</pre>`);
  }
);

module.exports = authRouter;
