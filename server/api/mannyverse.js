const express = require('express');
const router = express.Router();

const bestTweets = require('./fixtures/data-tweets');

/*
 * @return { data: [<array_of_tweet_objects_sorted_by_score>] }
 */
router.get('/best-tweets', async (_, res) => res.json(bestTweets));

module.exports = router;
