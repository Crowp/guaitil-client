require('babel-register')({
  presets: ['es2015', 'react']
});

const router = require('./src/utils/sitemap-routes').default;
const Sitemap = require('react-router-sitemap').default;

function generateSitemap() {
  return new Sitemap(router).build('https://guaitiltour.co.cr').save('./public/sitemap.xml');
}

generateSitemap();
