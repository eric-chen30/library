// pages/forget/forget.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    newPassword: '',
    newConfirm: ''
  },

  // 修改密码后跳到登录界面
  updatePassword: function(){
    let phone = this.data.phone
    let newPassword = this.data.newPassword
    let newConfirm = this.data.newConfirm
    let param = {
      phone: phone,
      newPassword: newPassword
    }
    let phoneReg = /^1[3|4|5|6|7|8]\d{9}$/
    let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    if(phoneReg.test(phone) && passwordReg.test(newPassword) && newPassword === newConfirm){
      let that = this
      console.log(that.data)
      wx.request({
        url: 'http://localhost:3000/users/setNewPassword',
        method: 'POST',
        data: param,
        success: (res) =>{
          if(res.data.code === 200){
            wx.showToast({
              title: '修改成功',
              icon: 'success'
            })

            // 将输入清空
            that.setData({
              phone: '',
              newPassword: '',
              newConfirm: ''
            })
            console.log(that.data)

            // 跳转到登录页面
            setTimeout(function(){
              wx.redirectTo({
                url: '../login/login',
              })
            },1200)   
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
            icon: 'none'
          })
        }
      })
    }else if(!phoneReg.test(phone) && passwordReg.test(newPassword) && newPassword === newConfirm){
      wx.showToast({
        title: '请检查电话格式',
        icon: 'none'
      })
    }else if(phoneReg.test(phone) && !passwordReg.test(newPassword) && newPassword === newConfirm){
      wx.showToast({
        title: '密码至少包含字母和数字，为6-20位',
        icon: 'none'
      })
    }else if(phoneReg.test(phone) && passwordReg.test(newPassword) && newPassword !== newConfirm){
        wx.showToast({
          title: '确认密码应与密码一致',
          icon: 'none'
        })
    }else{
      wx.showToast({
        title: '检查输入',
        icon: 'none'
      })
    }
  }

})