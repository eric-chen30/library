// pages/recommend/recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 滚动条高度
    clientHeight: '',
    // 个性标签
    tags: [],
    // 书籍相关信息
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
        query.select('.tags').boundingClientRect()
        query.select('.blank').boundingClientRect()
        // 通过query.exec返回的数组 进行减法，同时 去除 margin和border
        query.exec(res => {
          console.log(res)
          let h1 = res[0].height
          let h2 = res[1].height

          let scrollHeight = screenHeight - h1 - h2
          console.log(scrollHeight)
          that.setData({
            clientHeight: scrollHeight
          })
        })
      },
    })

    // 获取用户个性标签
    that.getPersonalTags()

    // 获取推荐列表  必须要确保先获取用户标签，然后才能调用这个函数(存在BUG 需要调整)
    that.getRecommendBooks()
  },

  // 获取个性标签
  getPersonalTags: function(){
    const app = getApp()
    let user_id = app.globalData.userInfo.user_id
    let param = {
      user_id: user_id
    }

    wx.request({
      url: 'http://localhost:3000/books/getPersonalTags',
      method: 'POST',
      data: param,
      success: (res) => {
        if(res.data.code === 200){
          console.log(res.data.data)
          // 将个性标签存到全局
          app.globalData.tags = res.data.data
          this.setData({
            tags: res.data.data
          })
          console.log(this.data.tags)
        }else{
          wx.showToast({
            title: '出错啦。',
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

  // 获取推荐列表
  getRecommendBooks: function(){
    console.log(this)
    const app = getApp()
    let tags = app.globalData.tags
    console.log(tags)
    let param = {
      tags: tags
    }
    
    wx.request({
      url: 'http://localhost:3000/books/getRecommendBooks',
      method: 'POST',
      data: param,
      success: (res) => {
        console.log(res)
        if(res.data.code === 200){
          console.log(res.data.data)
          console.log(this)
          this.setData({
            bookList: res.data.data
          })
        }else{
          wx.showToast({
            title: '请求失败1',
            icon: 'error'
          })
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '请求失败2',
          icon: 'error'
        })
      }
    })
  },

  // 借阅图书
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