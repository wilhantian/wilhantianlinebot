// http://10.0.3.6/api-svr/conf?cmd=getGameContent&appid=
const request = require('request');
const querystring = require("querystring");
const config = require('../config');

const APPID = config.channelId;

const GameService = require('./GameService');

class MsgService {
    
    constructor(){
        this.recommendGameInfos = [];
        this.welcomeGameInfos = [];
    }

    initRecommendGameInfos(ids){
        return new Promise( async (next)=>{
            for(var i=0; i<ids.length; i++){
                var id = ids[i];
                console.log(id);
                var msg = await GameService.getGameInfo(id);
                if(msg){
                    this.recommendGameInfos.push(msg);
                }
            }
            next(true);
        });
    }

    initWelcomeGameInfos(ids){
        return new Promise( async (next)=>{
            for(var i=0; i<ids.length; i++){
                var id = ids[i];
                console.log(id);
                var msg = await GameService.getGameInfo(id);
                if(msg){
                    this.welcomeGameInfos.push(msg);
                }
            }
            next(true);
        });
    }
}

module.exports = new MsgService();