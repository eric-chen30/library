// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {} 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取应用实例
    const app = getApp()
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo 
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})