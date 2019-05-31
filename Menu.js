const fs = require("fs");

module.exports = class Menu{
    constructor(client){
        this.client = client;

        this.client.getRichMenuList().then((res)=>{
            console.log("获取菜单列表:", res);
            for(var i=0; i<res.length; i++){
                var richMenuId = res[i].richMenuId;
                console.log("删除", richMenuId);
                this.client.deleteRichMenu(richMenuId)
                    .then((res)=>{
                        console.log("删除成功", res)
                    }, (err)=>{
                        console.warn("删除失败", err)
                    }).catch((err)=>{
                        console.error("删除错误", err)
                    });
            }

            // this.initGamePad();
            this.initDefMenu();
        }, (err)=>{
            console.error("获取菜单列表异常", err)
        }).catch((err)=>{console.error("获取菜单列表错误", err)});

    }

    initDefMenu(){
        this.client.createRichMenu({
            size: {
                width: 2500,
                height: 843
            },
            selected: true,
            name: "手柄菜单",
            chatBarText: "手柄",
            areas: [
                {
                    bounds: {
                        x: 0,
                        y: 0,
                        width: 843,
                        height: 843
                    },
                    action: {
                        type: "message",
                        label: "帮助",
                        text: "帮助"
                    }
                },
                {
                    bounds: {
                        x: 856,
                        y: 0,
                        width: 1620,
                        height: 843
                    },
                    action: {
                        type: "message",
                        label: "玩游戏",
                        text: "玩游戏"
                    }
                }
            ]
        }).then((id)=>{
            console.log("创建菜单完成", id);
            this.client.setRichMenuImage(id, fs.readFileSync("./img/默认.png"), "image/png")
                .then((res)=>{
                    console.log("上传图片ok", res);
                    //设置为默认菜单
                    this.client.setDefaultRichMenu(id)
                        .then((res)=>{
                            console.error("设置默认菜单成功", res);
                        }, (err)=>{
                            console.warn("设置默认菜单失败", err);
                        })
                        .catch((err)=>{
                            console.error("设置默认菜单错误", err);
                        })
                }, (err)=>{
                    console.warn("上传图片失败", err)
                })
                .catch((err)=>{
                    console.error("上传图片错误", err);
                });
        }, (err)=>{
            console.warn("创建菜单失败", err);
        }).catch((err)=>{
            console.error("创建菜单错误", err);
        });
    }

    initGamePad(){ 
        this.client.createRichMenu({
            size: {
                width: 2500,
                height: 843
            },
            selected: true,
            name: "手柄菜单",
            chatBarText: "手柄",
            areas: [
                {
                    bounds: {
                        x: 327,
                        y: 33,
                        width: 772,
                        height: 772
                    },
                    action: {
                        type: "message",
                        label: "方向键",
                        text: "方向键"
                    }
                },
                {
                    bounds: {
                        x: 1630,
                        y: 303,
                        width: 631,
                        height: 273
                    },
                    action: {
                        type: "message",
                        label: "功能键",
                        text: "功能键"
                    }
                },
                {
                    bounds: {
                        x: 1098,
                        y: 666,
                        width: 534,
                        height: 138
                    },
                    action: {
                        type: "message",
                        label: "切换键盘",
                        text: "切换键盘"
                    }
                }
            ]
        }).then((id)=>{
            console.log("创建菜单完成", id);
            this.client.setRichMenuImage(id, fs.readFileSync("./img/gamepad.jpeg"), "image/jpeg")
                .then((res)=>{
                    console.log("上传图片ok", res);
                    //设置为默认菜单
                    this.client.setDefaultRichMenu(id)
                        .then((res)=>{
                            console.error("设置默认菜单成功", res);
                        }, (err)=>{
                            console.warn("设置默认菜单失败", err);
                        })
                        .catch((err)=>{
                            console.error("设置默认菜单错误", err);
                        })
                }, (err)=>{
                    console.warn("上传图片失败", err)
                })
                .catch((err)=>{
                    console.error("上传图片错误", err);
                });
        }, (err)=>{
            console.warn("创建菜单失败", err);
        }).catch((err)=>{
            console.error("创建菜单错误", err);
        });
    }
}