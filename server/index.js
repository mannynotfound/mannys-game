const express = require('express');
const path = require('path');
const cors = require('cors');
const api = require('./api');
const DEV_PORT = 3001;
const PORT = process.env.PORT || DEV_PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// serve static assets in prod, become a api server in dev
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
  const buildPath = path.resolve(__dirname, '../build/');
  const indexPath = path.resolve(buildPath, 'index.html');
  app.use(express.static(buildPath));
  app.get('*', (_, res) => res.sendFile(indexPath));
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
} else {
  app.use('/api/leaderboard', api.leaderboard);
  app.use('/api/achievements', api.achievements);
  app.use('/api/fractions', api.fractions);
  app.use('/api/nft', api.nft);
  app.use('/api/download', api.download);
  app.use('/api/tattoo-shop', api.tattooShop);
  app.use('/api/mannyverse', api.mannyverse);

  app.listen(DEV_PORT, () => {
    console.log(`Server listening on ${DEV_PORT}`);
  });
}
