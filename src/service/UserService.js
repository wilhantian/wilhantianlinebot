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
        request.get(url + '?' + params, (error, response, body)=>{
            console.log(body);
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
            response.body.
            console.log(body, typeof body, response.toJSON());
        });
    }
}

module.exports = new UserService();