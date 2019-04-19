<h1 align="center"> SLACK-LACKEY </h1> <br>
<p align="center">
  <a href="">
    <img alt="slack-lackey" title="slack-lackey" src="https://photos.app.goo.gl/U5QuGScCoq2b9eT2A" width="150">
  </a>
</p>

<p align="center">
  Code saving and sharing. Built with Nodejs.
</p>

<p align="center">
  <a href="https://slack.com/">
    <img alt="Slack" title="slack" src="https://marker.io/vendor/img/logo/slack-logo.svg" width="140">
  </a>
</p>

## Table of Contents

- [Introduction](#introduction)
- [Set up](#Setup)
- [Modules](#Modules)
- [Contributors](#contributors)
- [Feedback](#feedback)

## Introduction
[![Build Status](https://travis-ci.com/slack-lackey/bot-server.svg?branch=development)](https://travis-ci.com/slack-lackey/bot-server)
Server for Slack-lackey app.

## Set up

### Setting the environvent
1. Clone or download the [bot-server](https://github.com/slack-lackey/bot-server)
2. `npm i ngrok` to set a secure tunnel with ngrok
3. Run ngrok with `ngrok http 8080` to generate your domain
4. Run the bot-server with `nodemon` or `node app.js`

### Create your own bot
1. [create a Slack App](https://api.slack.com/apps?new_app=1) to recieve an API token for your bot.
<p align="center">
  <img src = "https://scotch-res.cloudinary.com/image/upload/dpr_1,w_650,q_auto:good,f_auto/media/58448/G7O8TdZBRoqGzHxbEVdr_1_create_slack_app.png" width=700>
</p>

2. Enable Slack App Features
<p align="center">
  <img src = "https://scotch-res.cloudinary.com/image/upload/dpr_1,w_650,q_auto:good,f_auto/media/58448/JfHdPzNyScyFzA6Ie1CD_2_slack_features.png" width=700>
</p>

3. Enable envents subscriptions
- switch to on
- set the request URL to `Your ngrok domain/slack/events`
- subscribe to workspace events below:
    message.channels, reaction_added, file_created, file_changed, fire_shared
- save changes
<p align="center">
  <img src = "https://scotch-res.cloudinary.com/image/upload/dpr_1,w_650,q_auto:good,f_auto/media/58448/JfHdPzNyScyFzA6Ie1CD_2_slack_features.png" width=700>
</p>

4. Enable interactive components
- switch to on
- set the request URL to `Your ngrok domain/slack/actions`
- save changes
<p align="center">
  <img src = "https://scotch-res.cloudinary.com/image/upload/dpr_1,w_650,q_auto:good,f_auto/media/58448/pNdohjCDTci7eVBrUbms_5_interactive_components.png" width=700>
</p>

5. Auth and permissions
- Generate tokens for your workspace
- Set the request URL to `Your ngrok domain/auth/slack/callback`
<p align="center">
  <img src = "https://www.fullstackpython.com/img/160604-simple-python-slack-bot/copy-bot-access-token.png" width=700>
</p>

6. Install the app to your workspace

7. Go to your ngrok domain add bot to your workspace

8. Copy `Slack_CLIENT_ID`, `SLACK_CLIENT_SECRET` To your .env file

9. You also need `BOT_API_SERVER=https://slack-bot-api-server.herokuapp.com` in your .env file


## Modules

```
.
├── app.js
├── index.js
├── package-lock.json
├── package.json
└── src
    ├── auth
    │   └── auth-router.js
    ├── blocks
    │   ├── about.json
    │   ├── block-1.json
    │   ├── block-2.json
    │   ├── help.json
    │   └── success.json
    ├── bot
    │   ├── actions
    │   │   ├── dont-save.js
    │   │   ├── family.js
    │   │   ├── help.js
    │   │   ├── save-gist-snippet.js
    │   │   ├── save-gist.js
    │   │   └── share-gist.js
    │   ├── bot-router.js
    │   └── events
    │       ├── file-changed.js
    │       ├── file-created.js
    │       ├── message.js
    │       └── slack-events.js
    ├── database
    │   ├── db-routes.js
    │   ├── gist-model.js
    │   ├── gist-schema.js
    │   └── mongomodel.js
    ├── lib
    │   ├── random-gif.js
    │   └── web-api-helpers.js
    └── server.js
```


## Contributors
This project is brought to you by these awesome contributors.

<a href="https://opencollective.com/git-point/sponsor/9/website" target="_blank"><img src="./assets/whiteboards/billy-bot.png" height="40"></a>
<a href="https://opencollective.com/git-point/sponsor/9/website" target="_blank"><img src="./assets/whiteboards/chris-bot.png" height="40"></a>
<a href="https://opencollective.com/git-point/sponsor/9/website" target="_blank"><img src="./assets/whiteboards/erin-bot.png" height="40"></a>
<a href="https://opencollective.com/git-point/sponsor/9/website" target="_blank"><img src="./assets/whiteboards/vanessa-bot.png" height="40"></a>

## Feedback
Feel free to send us feedback on [file an issue](https://github.com/slack-lackey/docs/issues/new). Feature requests are always welcome. 
