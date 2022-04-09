// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户注册信息
    user: {
      name: 'Eric Chen',
      phone: '18471791040',
      school: 'HUBU',
      college: '计算机学院',
      marjor: '大数据',
      password: '123456',
      confirm: '123456'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 注册完成后跳到登录界面
  goToLogin: function(){
    wx.redirectTo({
      url: '../login/login',
    })
  },

  // 获取输入框内容
  // getNameValue:function(e){
   
  // },

  // 清空全部注册信息
  clearAll:function(){
    console.log(this.data.user)
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