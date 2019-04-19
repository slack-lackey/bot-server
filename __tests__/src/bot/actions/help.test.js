'use strict';

const rootDir = process.cwd();
let help = require(`${rootDir}/src/bot/actions/help.js`);

const payload = {hi: 'hello'};

const respond = (obj) => {
  if (typeof obj === 'object') {
    return true;
  } else {
    return false;
  }
};

describe('help.js', ()=> {
  it('Should return null with no inputs', ()=> {
    expect(help()).toBeNull();
  });
  it('Should return a response if given a payload and respond', ()=> {
    const spy = jest.spyOn(console, 'log');
    help(payload, respond);
    expect(spy).toBeCalled();
    spy.mockClear();
  });
});
