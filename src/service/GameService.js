// http://10.0.3.6/api-svr/conf?cmd=getGameContent&appid=
const request = require('request');
const querystring = require("querystring");
const config = require('../config');

const APPID = config.channelId;

class GameService {
    getGameInfo(gameId) {
        return new Promise((next) => {
            var url = 'http://10.0.3.6/api-svr/conf';
            var params = querystring.stringify({
                cmd: 'getGameContent',
                appid: gameId,
            })
            console.log(url + '?' + params);
            request.get(url + '?' + params, 
            { json: true }, (error, response, body) => {
                if (body.error) {
                    next();
                } else {
                    // { 
                    //     "id": 3, 
                    //     "icon": "https://static.6699.jp/mp/image/1558072291775_WoD6n761QNSoMNKn.png", 
                    //     "tag": "[\"HOT\"]", 
                    //     "category": "[\"休闲社交\"]", 
                    //     "subhead": "ワンコを合成！ワンワンワールド！", 
                    //     "conductImage": "https://static.6699.jp/mp/image/1559807746525_mmhegBXUAP_ivzOr.jpg", 
                    //     "adImage": "https://static.6699.jp/mp/image/1559807750965_n9RWlWoiqr34AET1.jpg", 
                    //     "des": "あなたはワンコがお好き？？\nかわいいワンコからキモイ？ワンコまで！\nキモイワンコをどう作るかって？？\n同じワンコ同士をスライドして合成すればおｋ！\n他のフレンドとわんわん楽しもう♪" 
                    // }
                    body.liff = this.getGameLiff(gameId);
                    next(body);
                }
            });
        });
    }

    getGameLiff(gameId){
        return `line://app/1595438846-2Pk99Vrq?appid=${gameId}`;
    }
}



module.exports = new GameService();