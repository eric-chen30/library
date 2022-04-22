// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户注册信息
    name: '',
    phone: '',
    stu_number: '',
    school: '',
    college: '',
    marjor: '',
    password: '',
    confirm: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 用户注册
  register: function(){
    // 获取创建用户参数
    let param = {
      user_name: this.data.name,
      phone: this.data.phone,
      password: this.data.password,
      stu_number: this.data.stu_number,
      school: this.data.school,
      college: this.data.college,
      marjor: this.data.marjor,
      confirm: this.data.confirm
    }

    if(this.data.password === this.data.confirm){
      wx.request({
        url: 'http://localhost:3000/users/register',
        method: 'POST',
        data: param,
        success: (res) => {
          console.log(res)
          if(res.data.code === 200){
            wx.showToast({
              title: res.data.msg,
              icon: 'success'
            })
            wx.redirectTo({
              url: '../login/login',
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        },
        fail: (err) => {
          wx.showToast({
            title: err,
          })
        }
      })
    }else{
      wx.showToast({
        title: '确认密码应该与密码保持一致',
        icon: 'none'
      })
    }
  },

  // 清空全部注册信息
  clearAll:function(){
    this.setData({
      name: '',
      phone: '',
      school: '',
      college: '',
      marjor: '',
      password: '',
      confirm: ''
    })
  },

})