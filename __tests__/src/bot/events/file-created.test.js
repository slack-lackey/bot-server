'use strict';

const rootDir = process.cwd();
let fileCreated = require(`${rootDir}/src/bot/events/file-created.js`);

let fileEvent = { type: 'file_created',
  file: { id: 'FJ0GT9DHS' },
  file_id: 'FJ0GT9DHS',
  user_id: 'UHL424Y9F',
  event_ts: '1555638802.043400' };

let body = { token: 'T294VsZsBYPKm2QOOYYtwMqA',
  team_id: 'THF13BXTL',
  api_app_id: 'AHVHAFG8Y',
  event:
 { type: 'file_created',
   file: { id: 'FJ0GT9DHS' },
   file_id: 'FJ0GT9DHS',
   user_id: 'UHL424Y9F',
   event_ts: '1555638802.043400' },
  type: 'event_callback',
  event_id: 'EvHUQC5DJ5',
  event_time: 1555638802,
  authed_users: [ 'UHZ3J65K9' ] };

describe('file-created.js', () => {
  it('should not run without inputs', ()=> {
    expect(fileCreated()).toBeNull();
  });
  xit('should log on success', ()=> {
    const spy = jest.spyOn(console, 'log');
    fileCreated(fileEvent, body);
    expect(spy).toBeCalled();
    spy.mockClear();
  });
});