const express = require('express');
const gamerData = require('./fixtures/data-gamers');

const router = express.Router();

/*
 * @return { data: [<array_of_gamer_objects>], updated_at: <unix_timestamp_in_seconds> }
 */
router.get('/', async (_, res) =>
  res.json({
    data: gamerData,
    updated_at: Date.now() / 1000,
  })
);

module.exports = router;
