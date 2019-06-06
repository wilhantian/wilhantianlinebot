const fs = require("fs");
const Line = require("./Line");

class Menu{
    constructor(){
        this.gameMenuList = [];
        this.gameMenuId = null;
    }

    init(){
        Line.getRichMenuList().then((res)=>{
            console.log("获取菜单列表:", res);
            for(var i=0; i<res.length; i++){
                var richMenuId = res[i].richMenuId;
                console.log("删除", richMenuId);
                Line.deleteRichMenu(richMenuId)
                    .then((res)=>{
                        console.log("删除成功", res)
                    }, (err)=>{
                        console.warn("删除失败", err)
                    }).catch((err)=>{
                        console.error("删除错误", err)
                    });
            }

            // this.initGamePad();
            this.initDefMenu("./img/richmenu-1.png", "line://app/1579130869-Dpk1R65p", "line://app/1579130869-8AgDwr4m", true);
            this.initDefMenu("./img/richmenu-2.png", "line://app/1579130869-pAZDoX4A", "line://app/1579130869-8AgDwr4m");
            // this.initGameMenu();
        }, (err)=>{
            console.error("获取菜单列表异常", err)
        }).catch((err)=>{console.error("获取菜单列表错误", err)});

        // 1分钟切换一次菜单
        setInterval(()=>{
            this.randomSetDefMenu();
        }, 1 * 60 * 1000);
    }

    //"line://app/1579130869-1bQDdkGB"
    initDefMenu(imagePath, bannerURL, homeURL, isDef){
        Line.createRichMenu({
            size: {
                width: 2500,
                height: 1686
            },
            selected: true,
            name: "菜单",
            chatBarText: "默认",
            areas: [
                {
                    bounds: {
                        x: 0,
                        y: 0,
                        width: 2500,
                        height: 840
                    },
                    action: {
                        type: "uri",
                        label: "banner",
                        uri: bannerURL
                    }
                },
                {
                    bounds: {
                        x: 0,
                        y: 840,
                        width: 840,
                        height: 846
                    },
                    action: {
                        type: "message",
                        label: "推荐",
                        text: "推荐"
                    }
                },
                {
                    bounds: {
                        x: 840,
                        y: 840,
                        width: 820,
                        height: 846
                    },
                    action: {
                        type: "uri",
                        label: "6699",
                        uri: homeURL
                    }
                },
                {
                    bounds: {
                        x: 1660,
                        y: 840,
                        width: 840,
                        height: 846
                    },
                    action: {
                        type: "message",
                        label: "客服",
                        text: "客服"
                    }
                }
            ]
        }).then((id)=>{
            console.log("创建菜单完成", id);
            this.gameMenuList.push(id);//保存id
            Line.setRichMenuImage(id, fs.readFileSync(imagePath), "image/png")
                .then((res)=>{
                    console.log("上传图片ok", res);
                    //设置为默认菜单
                    if(isDef){
                        Line.setDefaultRichMenu(id)
                        .then((res)=>{
                            console.error("设置默认菜单成功", res);
                        }, (err)=>{
                            console.warn("设置默认菜单失败", err);
                        })
                        .catch((err)=>{
                            console.error("设置默认菜单错误", err);
                        })
                    }
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

    initGameMenu(){
        Line.createRichMenu({
            size: {
                width: 2500,
                height: 843
            },
            selected: true,
            name: "主菜单",
            chatBarText: "主菜单",
            areas: [
                {
                    bounds: {
                        x: 0,
                        y: 0,
                        width: 836,
                        height: 843
                    },
                    action: {
                        type: "message",
                        label: "主菜单",
                        text: "主菜单"
                    }
                },
                {
                    bounds: {
                        x: 836,
                        y: 0,
                        width: 836,
                        height: 843
                    },
                    action: {
                        type: "message",
                        label: "选类型",
                        text: "选类型"
                    }
                },
                {
                    bounds: {
                        x: 1672,
                        y: 0,
                        width: 828,
                        height: 843
                    },
                    action: {
                        type: "uri",
                        label: "去平台",
                        uri: "line://app/1579130869-8AgDwr4m"
                    }
                }
            ]
        }).then((id)=>{
            console.log("创建菜单完成", id);
            this.gameMenuId = id;//保存id
            Line.setRichMenuImage(id, fs.readFileSync("./img/游戏.png"), "image/png")
                .then((res)=>{
                    console.log("上传图片ok", res);
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

    randomSetDefMenu(){
        var list = this.gameMenuList.map((b)=>{
            return b;
        });

        var list = list.sort(()=>{
            return Math.random()<0.5 ? -1 : 1;
        });

        var id = list[0];
        if(id){
            Line.setDefaultRichMenu(id)
            .then((res)=>{
                console.error("设置默认菜单成功", res);
            }, (err)=>{
                console.warn("设置默认菜单失败", err);
            })
            .catch((err)=>{
                console.error("设置默认菜单错误", err);
            })
        }
    }
}

module.exports = new Menu();