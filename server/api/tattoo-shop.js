const express = require('express');
const router = express.Router();
const tattooData = require('./fixtures/data-tattoo');
const multer = require('multer');
const upload = multer();

/*
 * this route normally takes a body with the following fields:
 *
 * @param  file  file data of tattoo texture
 * @param  sig  signature of token owner
 * @param  token  id of token to update
 * @param  path  filename to use for upload
 * @return { message: <success_or_fail_message>, textureUrl: <url of newly uploaded tattoo> }
 */
router.post(
  '/upload',
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'sig', maxCount: 1 },
    { name: 'token', maxCount: 1 },
    { name: 'path', maxCount: 1 },
  ]),
  async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    const { token } = req.body;
    res.status(200);
    res.json({
      message: `Successfully uploaded tattoo for #${token}`,
      textureUrl: 'https://mannys.game/logo.png',
    });
  }
);

/*
 * this route normally takes a body with the following fields:
 *
 * @param  sig  signature of token owner
 * @param  token  id of token to update
 * @param  textureUrl  url of uploaded tattoo image
 * @param  coordinates  three.js JSON data of where tattoo was placed
 * @param  code  optional promo code for free tattoo
 * @return { message: <success_or_fail_message> }
 */

router.post(
  '/submit',
  upload.fields([
    { name: 'sig', maxCount: 1 },
    { name: 'token', maxCount: 1 },
    { name: 'textureUrl', maxCount: 1 },
    { name: 'coordinates', maxCount: 1 },
    { name: 'code', maxCount: 1 },
  ]),
  async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    const { token } = req.body;
    res.status(200);
    res.json({
      message: `Successfully submitted tattoo for #${token}`,
    });
  }
);

/*
 * @param  tokenId  id of token to check tattoo data for
 * @return { data: { token_id, owner, tattoo_url, coordinates } }
 */
router.get('/view/:tokenId', async (req, res) =>
  res.json({ data: tattooData })
);

module.exports = router;
