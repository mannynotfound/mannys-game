const MANNYS_GAME_START = 1631838296;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomTxHash = () => {
  let hash = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 82; i++) {
    hash += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return `0x${hash}`;
};

module.exports = {
  MANNYS_GAME_START,
  getRandomInt,
  getRandomTxHash,
};
