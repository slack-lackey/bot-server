'use strict';

const rootDir = process.cwd();
let pickGif = require(`${rootDir}/src/lib/random-gif.js`);

describe('random gif', () => {
  it('Should pick a random gif', () => {
    expect(pickGif).not.toBeNull();
  });
});