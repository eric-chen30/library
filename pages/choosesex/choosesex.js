Page({

   /**
    * 页面的初始数据
    */
   data: {
      sex: '',
      columns: ['男', '女']
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      
   },

   chooseSex: function(event){
      const {value, index } = event.detail;
      console.log(value,index)
      // 调用接口，修改性别
      const app = getApp()
      let user_id = app.globalData.userInfo.user_id
      console.log(user_id)
      let param = {
         user_id: user_id,
         sex: value
      }
      wx.request({
        url: 'http://localhost:3000/users/chooseSex',
        method: 'POST',
        data: param,
        success: (res) => {
           if(res.data.code === 200){
              wx.showToast({
                title: '修改成功',
              })

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

   onCancel: function(){
      wx.navigateTo({
        url: '../userinfo/userinfo',
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