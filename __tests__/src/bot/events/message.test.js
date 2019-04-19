'use strict';

const rootDir = process.cwd();
let msg = require(`${rootDir}/src/bot/events/message.js`);



describe('message', () => {
  const spy = jest.spyOn(console, 'log');
  it('should not run without inputs', ()=> {
    expect(msg()).toBeNull();
  });
  xit('Should return backticks if it hears backticks', ()=> {
    let message = { client_msg_id: '8341fcf8-90e5-44f1-8ea8-4225ebba44bd',
      type: 'message',
      text: '```hi```',
      user: 'UHL424Y9F',
      ts: '1555639362.011900',
      channel: 'CJ342C8K0',
      event_ts: '1555639362.011900',
      channel_type: 'channel' };

    let body = { token: 'T294VsZsBYPKm2QOOYYtwMqA',
      team_id: 'THF13BXTL',
      api_app_id: 'AHVHAFG8Y',
      event:
   { client_msg_id: '8341fcf8-90e5-44f1-8ea8-4225ebba44bd',
     type: 'message',
     text: '```hi```',
     user: 'UHL424Y9F',
     ts: '1555639362.011900',
     channel: 'CJ342C8K0',
     event_ts: '1555639362.011900',
     channel_type: 'channel' },
      type: 'event_callback',
      event_id: 'EvHPKF2UG3',
      event_time: 1555639362,
      authed_users: [ 'UHZ3J65K9' ] };
    msg(message, body);
    expect(spy).toBeCalled();
    spy.mockClear();
  });
  xit('should return get my gists if it hears get my gists', ()=> {
    let message = { client_msg_id: '8341fcf8-90e5-44f1-8ea8-4225ebba44bd',
      type: 'message',
      text: 'get my gists',
      user: 'UHL424Y9F',
      ts: '1555639362.011900',
      channel: 'CJ342C8K0',
      event_ts: '1555639362.011900',
      channel_type: 'channel' };

    let body = { token: 'T294VsZsBYPKm2QOOYYtwMqA',
      team_id: 'THF13BXTL',
      api_app_id: 'AHVHAFG8Y',
      event:
   { client_msg_id: '8341fcf8-90e5-44f1-8ea8-4225ebba44bd',
     type: 'message',
     text: 'get my gists',
     user: 'UHL424Y9F',
     ts: '1555639362.011900',
     channel: 'CJ342C8K0',
     event_ts: '1555639362.011900',
     channel_type: 'channel' },
      type: 'event_callback',
      event_id: 'EvHPKF2UG3',
      event_time: 1555639362,
      authed_users: [ 'UHZ3J65K9' ] };
    
    msg(message, body);
    expect(spy).toBeCalled();
    spy.mockClear();
  });
  xit('should return help if it hears slack-lackey-help', ()=> {
    let message = { client_msg_id: '8341fcf8-90e5-44f1-8ea8-4225ebba44bd',
      type: 'message',
      text: 'slack-lackey-help',
      user: 'UHL424Y9F',
      ts: '1555639362.011900',
      channel: 'CJ342C8K0',
      event_ts: '1555639362.011900',
      channel_type: 'channel' };

    let body = { token: 'T294VsZsBYPKm2QOOYYtwMqA',
      team_id: 'THF13BXTL',
      api_app_id: 'AHVHAFG8Y',
      event:
   { client_msg_id: '8341fcf8-90e5-44f1-8ea8-4225ebba44bd',
     type: 'message',
     text: 'slack-lackey-help',
     user: 'UHL424Y9F',
     ts: '1555639362.011900',
     channel: 'CJ342C8K0',
     event_ts: '1555639362.011900',
     channel_type: 'channel' },
      type: 'event_callback',
      event_id: 'EvHPKF2UG3',
      event_time: 1555639362,
      authed_users: [ 'UHZ3J65K9' ] };
    msg.text = 'slack-lackey-help';
    msg(message, body);
    expect(spy).toBeCalled();
    spy.mockClear();
  });
});