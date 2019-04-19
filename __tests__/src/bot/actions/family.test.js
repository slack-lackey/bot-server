'use strict';

const rootDir = process.cwd();
let family = require(`${rootDir}/src/bot/actions/family.js`);

describe('family.js', () => {
  it('returns null if called with no respond parameter', () => {
    expect(family()).toBeNull();
  });
  
  it('returns a response if called properly', () => {
    function respond(){
      return {
        test: 'hi',
        replace_original: true,
      };
    }
    expect(family('1',respond)).toEqual(respond());
  });
});
