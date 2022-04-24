// pages/chooseage/chooseage.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      age: '',
      note: '年龄只不过是一个数字罢了。'
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      const app = getApp()
      this.setData({
         user_id: app.globalData.userInfo.user_id,
         age: app.globalData.userInfo.age
      })
   },

   chooseAge: function(){
      const app = getApp()
      let user_id = app.globalData.userInfo.user_id
      let age = parseInt(this.data.age)
      // 需要对年龄字段进行校验
      let ageReg = /^[0-9]*$/
      console.log(age,typeof(age),ageReg.test(age))
      if(ageReg.test(age) && age > 0 && age < 120){
         let param = {
            user_id: user_id,
            age: age
         }
         wx.request({
           url: 'http://localhost:3000/users/chooseAge',
           method: 'POST',
           data: param,
           success: (res) => {
              if(res.data.code === 200){
                  wx.showToast({
                     title: '设置成功',
                  })
                  setTimeout(function(){
                  wx.redirectTo({
                    url: '../userinfo/userinfo',
                  })
                  },1200)
              }else{
                  wx.showToast({
                    title: '失败',
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
      }else{
         wx.showToast({
           title: '输入应该为一个0-120之间的数字',
           icon: 'none'
         })
      }
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