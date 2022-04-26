// 图书分类
let getClassBooks = () =>{
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
}



module.exports = {
   getClassBooks
}