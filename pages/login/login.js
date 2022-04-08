// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '18471791040',
    password: '123456'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 登录
  Login: function(){
    // 获取参数 phone and password

    // 进行校验

    // 如果成功，进行页面跳转(switchTab 跳转到 tabBar 页面，并关闭所有非 tabBar 页面)
    wx.switchTab({
      url: '/pages/index/index',
    })
    // 如果失败，提示用户
  },

  // 跳转到注册界面(navigateTo and redirectTo 不能跳转到 tabBar 页面)
  goToRegister: function(){
    wx.navigateTo({
      url:'/pages/register/register'
    })
  },

  // 跳转到忘记密码界面
  goToForget: function(){
    wx.navigateTo({
      url: '/pages/forget/forget'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})