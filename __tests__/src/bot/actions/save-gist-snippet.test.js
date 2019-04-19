'use strict';
const rootDir = process.cwd();
let saveGistSnippet = require(`${rootDir}/src/bot/actions/save-gist-snippet.js`);

let payload = { type: 'block_actions',
  team: { id: 'THF13BXTL', domain: 'slacklackey' },
  user:
 { id: 'UHL424Y9F',
   username: 'chris.merritt95',
   name: 'chris.merritt95',
   team_id: 'THF13BXTL' },
  api_app_id: 'AHWNT1F9B',
  token: 'sNtlVTit7PH4b0rtkYtuYJ1y',
  container:
 { type: 'message_attachment',
   message_ts: '1555627082.041000',
   attachment_id: 1,
   channel_id: 'CJ0MKER54',
   is_ephemeral: true,
   is_app_unfurl: false },
  trigger_id: '601563269619.593037405938.ed21e0a671c39637b650d316bd3b26ac',
  channel: { id: 'CJ0MKER54', name: 'billy-and-chris' },
  response_url:
 'https://hooks.slack.com/actions/THF13BXTL/613061754464/pUwaGoQEevsyKs9uMLTr1o6j',
  actions:
 [ { action_id: 'save_gist_snippet',
   block_id: 'XtD6h',
   text: [Object],
   value: 'FHUMLG7QR',
   type: 'button',
   style: 'primary',
   action_ts: '1555627084.623529' } ] };


const respond = (obj) => {
  if (typeof obj === 'object') {
    return true;
  } else {
    return false;
  }
};

describe('help.js', ()=> {
  const spy = jest.spyOn(console, 'log');
  it('Should log success on success', () => {
    saveGistSnippet(payload, respond);
    expect(spy).toBeCalled();
    spy.mockClear();
  });
  it('Should return null with no inputs', ()=> {
    expect(saveGistSnippet()).toBeNull();
  });
  it('Should return null if payload.actions[0].value is null', () => {
    payload.actions[0].value = null;
    expect(saveGistSnippet(payload)).toBeNull();
  });
  it('Should return null if payload.user.team_id is null', () => {
    payload.actions[0].value = 'FHUMLG7QR';
    payload.user.team_id = null;
    expect(saveGistSnippet(payload)).toBeNull();
  });
  it('Should return null if payload.channel.id is null', () => {
    payload.user.team_id = 'UHL424Y9F';
    payload.channel.id = null;
    expect(saveGistSnippet(payload)).toBeNull();
  });
  
});