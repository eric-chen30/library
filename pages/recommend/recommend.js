// pages/recommend/recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 滚动条高度
    clientHeight: '',
    // 个性标签
    tags: ['计算机','治愈','技术','科幻','情感'],
    // 书籍相关信息
    bookList:[
      {
      bookName: '《小王子》',
      author: '安托万·德·圣埃克苏佩里',
      tag: '治愈系、孤独'
      },
      {
        bookName: '《小王子》',
        author: '安托万·德·圣埃克苏佩里',
        tag: '治愈系、孤独'
      },
      {
        bookName: '《小王子》',
        author: '安托万·德·圣埃克苏佩里',
        tag: '治愈系、孤独'
      }
    ],
    
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
  },

  // 获取个性标签


  // 获取推荐列表


  // 借阅图书


  // 收藏图书

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