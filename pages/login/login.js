Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  Login: function(){
    // 获取应用实例
    const app = getApp()
    // console.log(this.data.phone,this.data.password)
    let param = {
      phone: this.data.phone,
      password: this.data.password
    }
    wx.request({
      url: 'http://localhost:3000/users/login',
      method: 'POST',
      data: param,
      success: (res) => {
        if(res.data.code === 200){
          // 查询成功
          console.log(res.data.data)
          // 将用户信息userInfo存储到全局
          app.globalData.userInfo = res.data.data.userinfo
          console.log(app.globalData.userInfo)
          wx.showToast({
            title: res.data.msg,
            icon: "sucess"
          })
          // 跳转到图书页面
          setTimeout(function(){
            wx.switchTab({
              url: '../library/library',
            })
          },1200)

        }else{
          // 提示用户
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      },
      fail:(err) => {
        console.log(err)
      }
    })
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