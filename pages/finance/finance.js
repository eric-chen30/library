// pages/finance/finance.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      // 图片地址
      imageURL: '/images/demo.jpg',
      // 图书列表
      bookList:[],
      // 类别名称
      type: ''
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      console.log(options.type)
      this.setData({
         type: options.type
      })
      console.log(this.data.type)
      
      this.getClassBooks()
   },

   // 图书分类
   getClassBooks: function(){
      let category = this.data.type
      let param = {
         category: category
      }
      wx.request({
        url: 'http://localhost:3000/books/getClassBooks',
        method: 'POST',
        data: param,
        success: (res) => {
           console.log(res.data.data)
           if(res.data.code === 200){
              this.setData({
                 bookList: res.data.data
              })
           }else{
              wx.showToast({
                title: '请求失败',
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

   // 图书借阅
   lendBook: function(event){
      // 获取图书表主键bid
      let bid = event.currentTarget.dataset.bid
      console.log("图书主键为:" + bid)
      const app = getApp()
      let user_id = app.globalData.userInfo.user_id
      console.log("用户id为:" + user_id)
      let param = {
      bid: bid,
      user_id: user_id
      }
      wx.request({
      url: 'http://localhost:3000/books/lendBook',
      method: 'POST',
      data: param,
      success: (res) => {
         if(res.data.code ===200){
            wx.showToast({
            title: res.data.msg,
            icon: 'success'
            })
         }else{
            wx.showToast({
            title: res.data.msg,
            icon: 'none'
            })
         }
      },
      fail: (err) => {
         console.log(err)
      }
      })
   },

   // 收藏图书
   collectBook: function(event){
      // 获取图书表主键bid
      let bid = event.currentTarget.dataset.bid
      console.log("图书主键为:" + bid)
      const app = getApp()
      let user_id = app.globalData.userInfo.user_id
      console.log("用户id为:" + user_id)
      let param = {
      bid: bid,
      user_id: user_id
      }
      wx.request({
      url: 'http://localhost:3000/books/collectBook',
      method: 'POST',
      data: param,
      success: (res) => {
         if(res.data.code ===200){
            wx.showToast({
            title: res.data.msg,
            icon: 'success'
            })
         }else{
            wx.showToast({
            title: res.data.msg,
            icon: 'none'
            })
         }
      },
      fail: (err) => {
         console.log(err)
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