const line = require('@line/bot-sdk');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const config = require('./config');
const MsgMgr = require('./message/Manager');

const app = express();

const port = config.port;
const lineCfg = {
    channelAccessToken: config.channelAccessToken,
    channelSecret: config.channelSecret,
};

app.use(config.baseURL, express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

app.post(config.baseURL + config.messageCallbackURI, line.middleware(lineCfg), (req, res) => {
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
app.all(config.baseURL + '/upload', upload.single('image'), async (req, res)=>{
    var areas;
    try {
        areas = eval(req.body.areas);
    } catch (error) {
        res.redirect('/error.html');
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
        res.redirect(config.baseURL + '/admin.html');
    }else{
        res.redirect(config.baseURL + '/error.html');
    }
});

app.all(config.baseURL + "/get-menus", async (req, res)=>{
    var menuRes = await MsgMgr.inst.getAllRichMenu();
    res.json(menuRes);
})

app.post(config.baseURL + "/delete-menu", bodyParser.json(), async (req, res)=>{
    console.log(req.body.id);
    var menuRes = await MsgMgr.inst.deleteRichMenu(req.body.id);
    console.log(menuRes);
    res.json(menuRes);
})

app.post(config.baseURL + "/set-default-menu", bodyParser.json(), async (req, res)=>{
    var menuRes = await MsgMgr.inst.setDefaultRichMenu(req.body.id);
    res.json(menuRes);
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