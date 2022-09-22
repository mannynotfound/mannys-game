const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

/*
 * @param  filename that will be used for downloaded file
 *
 * this route normally takes a body with the following fields:
 *
 * @param  sig  signature of token owner
 * @param  token  id of token to update
 * @return <zip_file_with_base64_encoding>
 */

router.post('/token/:filename', async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  const zipPath = path.resolve(__dirname, 'fixtures/manny.zip');
  const zipAsBase64 = await fs.readFile(zipPath, { encoding: 'base64' });
  res.send(zipAsBase64);
});

module.exports = router;
