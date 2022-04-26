// app.js
App({
  onLaunch() {

    
  },
  globalData: {
    // 登录后将userinfo存储到全局  这种存储方式太过死板
    // 对于后期数据的更新无法实时行响
    // 实际上只需要使用到user_id，通过user_id在特定的生命周期请求接口来实现数据更新
    userInfo: {},
    // 个性标签
    tags: [],

  },

})
