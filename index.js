'use strict';

const config = require("./config");
const line = require('@line/bot-sdk');
const express = require('express');
const Menu = require("./Menu");
const client = require("./Line");
const MsgMgr = require("./message/MsgMgr");
const MsgReplys = require("./message/MsgReplys");
var http = require('http');
var qs = require('querystring');

const app = express();

Menu.init();
MsgReplys.init();

app.use(express.static('public'))

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

app.post('/auth', (request, response) => {
	var code = request.body.code;
	var redirect_uri = request.body.redirect_uri;
	var post_data = {
		grant_type: 'authorization_code',
		client_id: '1584819109',
		client_secret: '1275ffd0b63cc37a85d6498535ca7c36',
		code: code,
		redirect_uri: redirect_uri
	};

	var content = qs.stringify(post_data);

	var options = {
		hostname: 'https://api.line.me',
		path: '/v2/oauth/accessToken',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}
	};

	var req = http.request(options, function (res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('BODY: ' + chunk);
			response.json(JSON.parse(chunk));
		});
	});

	req.on('error', function (e) {
		console.log('problem with request: ' + e.message);
	});

	// 将数据写入请求体
	req.write(content);//注意这个地方  
	req.end();
});

// event handler
function handleEvent(event) {
	console.log("收到消息:", event, event.source.userId);
	MsgMgr.handle(event);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});