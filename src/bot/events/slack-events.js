

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