const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const {
  EMAIL_JS_SERVICE,
  EMAIL_JS_TEMPLATE,
  EMAIL_JS_USER,
  CAPTCHA_SITE_KEY,
  GTAG,
  ON_GITHUB_PAGES,
} = process.env;

const basePath = ON_GITHUB_PAGES ? '/Xtreme-Light' : '';
const assetPrefix = ON_GITHUB_PAGES ? '/Xtreme-Light/' : '';

const env = {
  CANONICAL_URL: 'https://Xtreme-Light.github.io',
  EMAIL_JS_SERVICE,
  EMAIL_JS_TEMPLATE,
  EMAIL_JS_USER,
  CAPTCHA_SITE_KEY,
  GTAG,
};

module.exports = withPlugins([
  [optimizedImages, {
    mozjpeg: {
      quality: 80,
    },
    pngquant: {
      speed: 3,
      strip: true,
      verbose: true,
    },
  }],
  {
    env,
    basePath,
    assetPrefix,
  },
]);
