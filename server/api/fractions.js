const express = require('express');
const router = express.Router();

const fractions = require('./fixtures/data-fractions');

/*
 * @return { fractions: [<array_of_fraction_objects>] }
 */
router.get('/drop-1', async (_, res) => res.json({ fractions }));

module.exports = router;
