// pages/subscribe/subscribe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 滚动条高度
    clientHeight: '',
    // 标签名
    tabName: 'reading',
    imageURL: '/images/demo.jpg',
    lendBookList:[],
    returnBookList:[],
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
        query.select('.tabs').boundingClientRect()
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

    // 获取借阅图书列表
    that.getLendBooks()
  },

  // 获取借阅图书列表
  getLendBooks: function(){
    const app = getApp()
    let user_id = app.globalData.userInfo.user_id
    let param = {
      user_id: user_id
    }
    wx.request({
      url: 'http://localhost:3000/books/getLendBooks',
      method: 'POST',
      data: param,
      success: (res) => {
        if(res.data.code === 200){
          console.log(res.data.data)
          this.setData({
            lendBookList: res.data.data
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

  // 图书归还
  returnBook: function(event){
    let bid = event.currentTarget.dataset.bid
    console.log("图书主键为:" + bid)
    const app = getApp()
    let user_id = app.globalData.userInfo.user_id
    let param = {
      user_id: user_id,
      bid: bid
    }
    wx.request({
      url: 'http://localhost:3000/books/returnBook',
      method: 'POST',
      data: param,
      success: (res) => {
        if(res.data.code === 200){
          wx.showToast({
            title: '归还成功',
          })
          // 更新列表
          this.getLendBooks()
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

  // 获取归还列表
  getReturnBooks: function(){
    const app = getApp()
    let user_id = app.globalData.userInfo.user_id
    let param = {
      user_id: user_id
    }
    wx.request({
      url: 'http://localhost:3000/books/getReturnBooks',
      method: 'POST',
      data: param,
      success: (res) => {
        if(res.data.code === 200){
          console.log(res.data.data)
          this.setData({
            returnBookList: res.data.data
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

  // 标签状态 
  onTabChange: function(event){
    console.log(event.detail.name)
    this.setData({
      tabName: event.detail.name
    })
    // 根据标签调用不同的接口，返回不同的图书列表
    if(this.tabName == 'reading'){
      this.getLendBooks()
    }else{
      this.getReturnBooks()
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