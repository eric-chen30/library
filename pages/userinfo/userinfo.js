Page({

  data: {
    userInfo: {} 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfoById()
  },

  // 通过用户id获取用户信息
  getUserInfoById: function(){
    const app = getApp()
    let user_id = app.globalData.userInfo.user_id
    console.log('用户id为：'+ user_id)
    let param = {
      user_id: user_id
    }
    wx.request({
      url: 'http://localhost:3000/users/getUserInfoById',
      method: 'POST',
      data: param,
      success: (res) => {
        if(res.data.code === 200){
          // 更新全局用户信息
          app.globalData.userInfo = res.data.data[0]
          this.setData({
            userInfo: res.data.data[0]
          })
          console.log(this.data.userInfo)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'error'
          })
        }
      },
      fail: (err) => {
        wx.showToast({
          title: err,
          icon: 'error'
        })
      }
    })
  },

})