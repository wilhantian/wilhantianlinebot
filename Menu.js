module.exports = class Menu{
    client = null;

    constructor(client){
        this.client = client;

        this.initMenuList();
    }

    initMenuList(){ 
        this.client.getRichMenuList().then((res)=>{
            console.log("获取菜单列表:", res)
        }, (err)=>{
            console.error("获取菜单列表异常", err)
        }).catch((err)=>{console.error("获取菜单列表错误", err)})
    }
}