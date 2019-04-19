'use strict';

const rootDir = process.cwd();
let help = require(`${rootDir}/src/bot/actions/help.js`);

describe('help.js', ()=> {
  it('Should return null with no inputs', ()=> {
    expect(help()).toBeNull();
  });
  it('Should return a response if given a payload and respond', ()=> {
    let res = { text: 'Processing...'};
    function respond(){
      return {
        blocks: 'hi',
        replace_original: true,
      };
    }
    expect(help('1', respond())).toEqual(res);
  });
});
