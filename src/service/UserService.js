const request = require('request');
const querystring = require("querystring");
const config = require('../config');

const APPID = config.channelId;

class UserService{
    follow(openid){
        var url = 'http://10.0.3.6/api-svr/focus';
        var params = querystring.stringify({
            cmd: 'add',
            openid: openid,
            appid: APPID,
            type: 2
        })
        console.log(url + '?' + params);
        request.get(url + '?' + params, {json:true}, (error, response, body)=>{
            if(body.error){
                console.error(body.error);
            }else{
                console.log(`用户${openid}开始关注`);
            }
        });
    }

    unfollow(openid){
        var url = 'http://10.0.3.6/api-svr/focus';
        var params = querystring.stringify({
            cmd: 'del',
            openid: openid,
            appid: APPID,
        })
        console.log(url + '?' + params);
        request.get(url + '?' + params, {json:true}, (error, response, body)=>{
            if(body.error){
                console.error(body.error);
            }else{
                console.log(`用户${openid}取消关注`);
            }
        });
    }
}

module.exports = new UserService();