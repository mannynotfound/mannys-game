const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

/*
 * this route normally takes a body with the following fields:
 *
 * @param  token  id of token to update
 * @param  sig  signature of token owner
 * @param  file  data uri of image being uploaded
 * @return { message: <success_or_fail_message>, newImage: <url of newly uploaded image> }
 */
router.post(
  '/image-upload',
  upload.fields([
    { name: 'token', maxCount: 1 },
    { name: 'sig', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]),
  async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    const { token } = req.body;
    res.status(200);
    res.json({
      message: `Successfully updated image for #${token}`,
      newImage: `https://lol.com/${token}`,
    });
  }
);

module.exports = router;
