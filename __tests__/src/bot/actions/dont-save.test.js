'use strict';

jest.mock('event-handlers');

const rootDir = process.cwd();
let dontsave = require(`${rootDir}/src/bot/actions/dont-save.js`);

const payload = {hi: 'hello'};

const respond = (obj) => {
  if (typeof obj === 'object') {
    return true;
  } else {
    return false;
  }
};

describe('dont-save', () => {
  it('should not run without inputs', ()=> {
    expect(dontsave()).toBeNull();
  });
  it('Should return a response', () => {
    const spy = jest.spyOn(console, 'log');
    dontsave(payload, respond);
    expect(spy).toBeCalled();
    spy.mockClear();
  });
});
