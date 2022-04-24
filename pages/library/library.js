// pages/library/library.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 滚动条高度
    clientHeight: '',
    // 标签名
    tabName: 'library',
    // 图片地址
    imageURL: '/images/demo.jpg',
    // 侧标栏分类索引
    activeKey: 0,
    // 图书列表
    bookList:[],
    // 搜索值
    searchValue: " "

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
        query.select('.search').boundingClientRect()
        query.select('.tabs').boundingClientRect()
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

    this.getAll()
  },

  // 标签切换
  onTabChange:function(event){
    console.log(event.detail.name)
    this.setData({
      tabName: event.detail.name
    })
    // 根据标签调用对应的接口
    if(this.data.tabName === 'library'){
      this.getAll()
    }else if(this.data.tabName === 'rankList'){
      this.getRankList()
    }else if(this.data.tabName === 'classification'){
      // 什么都不做
    }else{
      wx.showToast({
        title: '请求错误',
        icon: 'error'
      })
    }
  },

  // 全部图书
  getAll: function(){
    wx.request({
      url: 'http://localhost:3000/',
      method: 'GET',
      success: (res) => {
        if(res.data.code ===200){
          this.setData({
            bookList: res.data.data
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

  // 排行榜单
  getRankList: function(){
    wx.request({
      url: 'http://localhost:3000/books/rankList',
      method: 'GET',
      success: (res) => {
        if(res.data.code ===200){
          this.setData({
            bookList: res.data.data
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

  // 图书搜索
  bookSearch: function(){
    // SyntaxError: Unexpected token 小 in JSON at position 1
    // 当使用POST进行传参时，需要穿的是json对象，单独传一个参数值，会有语法错误
    // let searchValue = this.data.searchValue
    let param = {
      searchValue: this.data.searchValue
    }
    console.log(this.data.searchValue,typeof(this.data.searchValue))
    wx.request({
      url: 'http://localhost:3000/books/bookSearch',
      method: 'POST',
      // data: searchValue,    不能这样进行传值
      data: param,
      success: (res)=> {
        console.log(res)
        if(res.data.code === 200){
          this.setData({
            bookList: res.data.data
          })
        }else if(res.data.code === 201){
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
        else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },

  // 清空输入框后重新请求图书列表（如何监听）
  cancelSearch: function(){
    // 根据标签请求对应接口
    if(this.data.tabName === 'library'){
      this.getAll()
    }else if(this.data.tabName === 'rankList'){
      this.getRankList()
    }else if(this.data.tabName === 'classification'){
      // 什么都不错
    }else{
      wx.showToast({
        title: '请求错误',
        icon: 'error'
      })
    }
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