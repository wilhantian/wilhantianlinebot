const confDev = require('./config-dev');
const confPub = require('./config-pub');

const isDebug = true;

const config = isDebug ? confDev : confPub;
module.exports = {
    isDebug: isDebug,
    ...config,
    getPublicPath: function(path){
        return config.cdnURL + '/' + path;
    }
}