// http://10.0.3.6/api-svr/conf?cmd=getGameContent&appid=
const request = require('request');
const querystring = require("querystring");
const config = require('../config');

const APPID = config.channelId;

const GameService = require('./GameService');

class MsgService {
    // recommendGameInfos = [];
    constructor(){
        this.recommendGameInfos = [];
    }

    initRecommendGameInfos(ids, liffs){
        return new Promise( async (next)=>{
            for(var i=0; i<ids.length; i++){
                var msg = await GameService.getGameInfo();
                if(msg){
                    msg.liff = liffs[i];
                    this.recommendGameInfo.push(msg);
                }
            }
            next(true);
        });
    }
}

module.exports = new MsgService();