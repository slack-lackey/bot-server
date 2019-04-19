'use strict';

const faker = require('faker');

let gifArray = [
  'https://media.giphy.com/media/T0WzQ475t9Cw/giphy.gif',
  'https://media.giphy.com/media/AgrfqPt5AyiTm/giphy.gif',
  'https://media.giphy.com/media/iVVQweT5IeZUc/giphy.gif',
  'https://media.giphy.com/media/XdHbUa7eL3DTW/giphy.gif',
  'https://media.giphy.com/media/COObcw2dmXzBm/giphy.gif',
  'https://media.giphy.com/media/OHZ1gSUThmEso/giphy.gif',
  'https://media.giphy.com/media/T0WzQ475t9Cw/giphy.gif',
  'https://media.giphy.com/media/OoTKFwKiOAbYc/giphy.gif',
  'https://media.giphy.com/media/K3RxMSrERT8iI/giphy.gif',
  'https://media.giphy.com/media/xbkMY5GeLGZG0/giphy.gif',
  'https://media.giphy.com/media/GS1VR900wmhJ6/giphy.gif',
  'https://media.giphy.com/media/YPTy760meD2xi/giphy.gif',
  'https://media.giphy.com/media/8UF0EXzsc0Ckg/giphy.gif',
  'https://media.giphy.com/media/l3vRaWnqG3gOZ8lsk/giphy.gif',
  'https://media.giphy.com/media/a9imQoghMq5IQ/giphy.gif',
  'https://media.giphy.com/media/fxsqOYnIMEefC/giphy.gif',
  'https://media.giphy.com/media/87SLBtmdpwxva/giphy.gif',
  'https://media.giphy.com/media/Srf1W4nnQIb0k/giphy.gif',
  'https://media.giphy.com/media/ecVcN1B2h1cpW/giphy.gif',
  'https://media.giphy.com/media/Gy2axIlArrq00/giphy.gif',
  'https://media.giphy.com/media/vmtxnxveVUodG/giphy.gif',
  'https://media.giphy.com/media/Yb3d5B1zwuhCo/giphy.gif',
  'https://media.giphy.com/media/gxzJbCkfmus/giphy.gif',
  'https://media.giphy.com/media/n5VaQoW39Z9S0/giphy.gif',
];
/**Pick a random GIF from the array.
 * @param  {} array
 * @returns A random gif.
 */
let pickGif = (array = gifArray) => {
  let selectedGif = array[faker.random.number({ min: 0, max: (array.length - 1) })];
  return selectedGif;
};

module.exports = pickGif;
