// pages/booklist/booklist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 滚动条高度
    clientHeight: '',
    imageURL: '/images/demo.jpg',
    bookList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: (result) => {
        // 获取屏幕高度
        let screenHeight = wx.getSystemInfoSync().windowHeight
        // 通过query 获取盒子其它高度
        let query = wx.createSelectorQuery().in(that)
        query.select('.header').boundingClientRect()
        // 通过query.exec返回的数组 进行减法，同时 去除 margin和border
        query.exec(res => {
          console.log(res)
          let h1 = res[0].height
          let scrollHeight = screenHeight - h1
          console.log(scrollHeight)
          that.setData({
            clientHeight: scrollHeight
          })
        })
      },
    })

    // 获取收藏列表
    that.getCollectBooks()
  },

  // 收藏列表
  getCollectBooks: function(){
    const app = getApp()
    let user_id = app.globalData.userInfo.user_id
    let param = {
      user_id: user_id
    }
    wx.request({
      url: 'http://localhost:3000/books/getCollectBooks',
      method: 'POST',
      data: param,
      success: (res) => {
        if(res.data.code === 200){
          console.log(res.data.data)
          this.setData({
            bookList: res.data.data
          })
        }else{
          wx.showToast({
            title: '出现问题啦',
            icon: 'none'
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
    console.log(event)
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

  // 取消订阅
  unSubscribe: function(event){
    let bid = event.currentTarget.dataset.bid
    console.log("图书主键为:" + bid)
    let param = {
      bid: bid
    }
    wx.request({
      url: 'http://localhost:3000/books/unSubscribe',
      method: 'POST',
      data: param,
      success: (res) => {
        if(res.data.code === 200){
          wx.showToast({
            title: res.data.msg,
          })
          // 更新列表
          this.getCollectBooks()
        }else{
          wx.showToast({
            title: '取消失败',
            icon: 'error'
          })
        }
      },
      fail: (err) => {
        wx.showToast({
          title: err,
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