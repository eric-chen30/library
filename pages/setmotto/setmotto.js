// pages/setmotto/setmotto.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      motto: '',
      note: '设置你最喜欢的一句话吧。'
   },

   setMotto: function(){
      const app = getApp()
      let user_id = app.globalData.userInfo.user_id
      let motto = this.data.motto
      let param = {
         user_id: user_id,
         motto: motto
      }

      wx.request({
        url: 'http://localhost:3000/users/setMotto',
        method: 'POST',
        data: param,
        success: (res) => {
            if(res.data.code === 200){
               wx.showToast({
               title: '修改成功',
               })
               // 跳转到 userinfo
               setTimeout(function(){
               wx.redirectTo({
                 url: '../userinfo/userinfo',
               })
               },1200)
            }else{
               wx.showToast({
               title: '修改失败',
               icon: 'error'
               })
            }
         },
         fail: (err) => {
            wx.showToast({
            title: err,
            icon: 'none'
            })
         }
      })
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      const app = getApp()
      this.setData({
         user_id: app.globalData.userInfo.user_id,
         motto: app.globalData.userInfo.motto
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