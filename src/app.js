const line = require('@line/bot-sdk');
const express = require('express');
const multer = require('multer');

const config = require('./config');
const MsgMgr = require('./message/Manager');
const message = require('./message/message');

const app = express();

const port = config.port;
const lineCfg = {
    channelAccessToken: config.channelAccessToken,
    channelSecret: config.channelSecret,
};

app.use(express.static('public'))

app.post(config.messageCallbackURI, line.middleware(lineCfg), (req, res) => {
    Promise
        .all(req.body.events.map((event)=>{
            return MsgMgr.inst.handle(event);
        }))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

var storage = multer.memoryStorage()
var upload = multer({
    storage: storage
});
app.all('/upload', upload.single('image'), (req, res)=>{
    console.log('req.file = ', req.file);
    console.log('req.body = ', req.body);

    res.json({
        code: 200,
    })
});

app.listen(port, () => {
    console.log(`listening on ${port}`);
});


// MsgMgr.inst.register('message', {
//     'message.type': 'text',
//     'message.text': 'hello'
// }, function (event) {
//     return Line.replyMessage(event.replyToken, {
//         type: 'text', text: event.message.text + '...'
//     });
// });

// 初始化消息管理器
MsgMgr.inst;