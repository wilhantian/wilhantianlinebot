'use strict';

const config = require("./config");
const line = require('@line/bot-sdk');
const express = require('express');
const Menu = require("./Menu");
const client = require("./Line");
const MsgMgr = require("./message/MsgMgr");
const MsgReplys = require("./message/MsgReplys");
var bodyParser = require('body-parser');//解析,用req.body获取post参数

var http = require('https');
var qs = require('querystring');

const app = express();

app.use(express.static('public'));

Menu.init();
MsgReplys.init();


app.all('/', (req, res) => {
	res.send(JSON.stringify({
		name: 'ok'
	}))
});

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.all('/callback', line.middleware(config.LineConfig), (req, res) => {
	Promise
		.all(req.body.events.map(handleEvent))
		.then((result) => res.json(result))
		.catch((err) => {
			res.json({
				error: "错误了",
			})
		});
});

app.post("/get_reward", bodyParser.json(), bodyParser.urlencoded({ extended: false }), (request, response) => {
	console.log(request.body.userId);
	client.pushMessage(request.body.userId, {
		type: 'flex',
		altText: "亚马逊",
		contents: {
			"type": "bubble",
			"hero": {
				"type": "image",
				"url": "https://wilhantianlinebot.herokuapp.com/img/amazon-card.png",
				"size": "full",
				"aspectRatio": "1.58:1",
				"action": {
					"type": "uri",
					"uri": "https://www.amazon.cn/gp/css/gc/payment/ref=asv_gclp_bwd_red",
					"label": "兑换地址"
				}
			},
			"body": {
				"type": "box",
				"layout": "vertical",
				"contents": [
					{
						"type": "box",
						"layout": "horizontal",
						"contents": [
							{
								"type": "text",
								"text": "金额",
								"flex": 1,
								"weight": "bold",
								"color": "#666666"
							},
							{
								"type": "text",
								"text": "￥30",
								"flex": 2
							}
						]
					},
					{
						"type": "box",
						"layout": "horizontal",
						"contents": [
							{
								"type": "text",
								"text": "卡号",
								"flex": 1,
								"weight": "bold",
								"color": "#666666"
							},
							{
								"type": "text",
								"text": "2614-8D62-1EF7",
								"flex": 2
							}
						]
					}
				]
			}
		}
	})
	response.json({
		code: 200
	});
});

app.post('/auth', bodyParser.json(), bodyParser.urlencoded({ extended: false }), (request, response) => {

	var code = request.body.code;
	var redirect_uri = request.body.redirect_uri;
	console.log(code, redirect_uri);
	var post_data = {
		grant_type: 'authorization_code',
		client_id: '1584819109',
		client_secret: '1275ffd0b63cc37a85d6498535ca7c36',
		code: code,
		redirect_uri: redirect_uri
	};

	var content = qs.stringify(post_data);

	var options = {
		protocol: 'https:',
		hostname: 'api.line.me',
		port: 443,
		path: '/v2/oauth/accessToken',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': content.length
		}
	};

	// 获取token
	var req = http.request(options, function (res) {
		console.log('STATUS: ' + res.statusCode);
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('BODY: ' + chunk);
			var resJson = JSON.parse(chunk);
			var access_token = resJson.access_token;

			// 获取用户信息
			options.method = 'GET';
			options.path = "/v2/profile";
			options.headers = {
				Authorization: 'Bearer ' + access_token
			};
			var pReq = http.request(options, function (pRes) {
				pRes.setEncoding('utf8');
				pRes.on('data', function (chunk) {
					console.log(chunk);
					response.json(JSON.parse(chunk));
				});
			});
			pReq.on('error', function (e) {
				console.log('获取用户信息失败', e);
			});
			pReq.end();
		});
	});

	req.on('error', function (e) {
		console.log('problem with request: ' + e.message);
	});

	// 将数据写入请求体
	req.write(content);//注意这个地方  
	req.end();

	console.log(content);
});

// event handler
function handleEvent(event) {
	console.log("收到消息:", event, event.source.userId);
	var res = MsgMgr.handle(event);
	if (res) {
		return res;
	}
	return Promise.reject(null);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});