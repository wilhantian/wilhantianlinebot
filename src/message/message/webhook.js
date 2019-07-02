module.exports = [
    {
        type: "follow",
        param: undefined,
        handler: function(event){
            console.log("关注了账户")
        }
    },
    {
        type: "unfollow",
        param: undefined,
        handler: function(event){
            console.log("取关了账户")
        }
    },
]