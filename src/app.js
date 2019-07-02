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
app.all('/upload', upload.single('image'), async (req, res)=>{
    console.log('req.file = ', req.file);
    console.log('req.body = ', req.body);

    var areas;
    try {
        areas = eval(req.body.areas);        //JSON.parse
    } catch (error) {
        res.redirect('/error.html');
        console.log(error);
        return;
    }

    var menuRes = await MsgMgr.inst.createRichMenu(
        {
            width: req.body.width,
            height: req.body.height
        }, 
        true, 
        req.body.name, 
        req.body.chatBarText, 
        areas,
        req.file.buffer,
        req.file.mimetype
    );
    console.log(menuRes);
    if(menuRes.state){
        res.redirect('/admin.html');
    }else{
        res.redirect('/error.html');
    }
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