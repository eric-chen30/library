// pages/changename/changename.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      note: '好的名字可以让你的朋友更容易记住你。',
      user_name: '',
      user_id: ''
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      const app = getApp()
      this.setData({
         user_id: app.globalData.userInfo.user_id,
         user_name: app.globalData.userInfo.user_name
      })
   },


   changeName: function(){
      console.log(this.data.user_id,this.data.user_name)
      let param = {
         user_id: this.data.user_id,
         user_name: this.data.user_name
      }
      wx.request({
        url: 'http://localhost:3000/users/changeName',
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