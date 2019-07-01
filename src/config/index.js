const confDev = require('./config-dev');
const confPub = require('./config-pub');

const isDebug = true;

module.exports = isDebug ? confDev : confPub;