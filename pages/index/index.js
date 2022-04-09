// 获取应用实例
const app = getApp()

Page({
  data: {
    // 用户名称
    userName: 'Eric Chen'
  },
  
  onLoad() {
    
  },

  // 跳转到编辑个人信息
  goToUserInfo: function(){
    wx.navigateTo({
      url: '../userinfo/userinfo',
    })
  },

  // 跳转到我的订阅
  goToSubscribe: function(){
    wx.navigateTo({
      url: '../subscribe/subscribe',
    })
  },
  
  // 跳转到我的书单
  goToBookList:function(){
    wx.navigateTo({
      url: '../booklist/booklist',
    })
  },

  // 退出登录
  logout: function(){
    wx.reLaunch({
      url: '../login/login',
    })
  }
})
