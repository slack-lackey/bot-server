'use strict';

/**
 * Slack Event Hanlder — "file-changed" Event
 * Fired when a snippet file is edited in Slack
 * @module src/bot/events/file-changed
 */

const blockOne = require('../../blocks/block-1.json');
const getClientByTeamId = require('../../lib/web-api-helpers').getClientByTeamId;
const getToken = require('../../lib/web-api-helpers.js').getToken;
/**Listens if a file has been changed.
 * @param  {} fileEvent
 * @param  {} body
 * @returns Sends a message to the slack channel.
 */
module.exports = (fileEvent, body) => {
  if(!fileEvent || !body){return null;}
  console.log('file changed successfully');

  let teamId = body.team_id;
  const slack = getClientByTeamId(teamId); // get correct web client
  const token = getToken(teamId); // get token from local storage
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
          text: `Hey, <@${file.file.user}>, looks like you changed a code snippet. Want me to save it for you as a Gist? :floppy_disk:`,          
          user: file.file.user,
          attachments: [
            block,
          ],
        });
        console.log('success');
      }
    })

    .catch(err => console.error(err));
};
