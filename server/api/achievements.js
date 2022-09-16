const express = require('express');
const router = express.Router();
const gamersConfig = require('./fixtures/data-gamers.json');
const achievementsConfig = require('../../src/fixtures/achievements');
const { MANNYS_GAME_START, getRandomInt, getRandomTxHash } = require('./utils');

const getRandomArray = (amount, array) => {
  const randomElements = [];
  const elements = array.slice(0);
  while (randomElements.length < amount) {
    const randomIdx = Math.floor(Math.random() * elements.length);
    const nextElement = elements.splice(randomIdx, 1)[0];
    randomElements.push(nextElement);
  }

  return randomElements;
};

const getRandomAchievements = () => {
  const totalAchievements = achievementsConfig.length;
  const amountOfAchievements = getRandomInt(1, totalAchievements);
  return getRandomArray(amountOfAchievements, achievementsConfig);
};

const getRandomGamers = () => {
  const totalGamers = getRandomInt(1, 100);
  return getRandomArray(totalGamers, gamersConfig);
};

const getRandomDate = () => {
  return getRandomInt(MANNYS_GAME_START, Date.now() / 1000);
};

/*
 * @param  gamer  address of gamer to get achievements for
 * @return [<array_of_achievement_objects>]
 */
router.get('/gamer/:gamer', async (req, res) => {
  const randomAchievements = getRandomAchievements();
  const achievementsResponse = randomAchievements.map((ach) => ({
    achievement_id: ach.id,
    date_earned: getRandomDate(),
    requirements: [
      {
        tx_hash: getRandomTxHash(),
        requirement_id: 0,
      },
    ],
  }));

  res.json(achievementsResponse);
});

/*
 * @param  achievementId  numerical id of achievement
 * @return [<array_of_gamer_objects_whove_earned_achievement>]
 */
router.get('/id/:achievementId', async (req, res) => {
  const { achievementId } = req.params;
  const randomEarners = getRandomGamers();
  const earnersResponse = randomEarners.map((gamer) => ({
    gamer: gamer.owner,
    name: gamer.name,
    achievement_id: achievementId,
    date_earned: getRandomDate(),
    requirements: [
      {
        tx_hash: getRandomTxHash(),
        requirement_id: 0,
      },
    ],
  }));

  res.json(earnersResponse);
});

module.exports = router;
