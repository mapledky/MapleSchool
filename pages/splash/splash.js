// pages/splash/splash.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var account = null
    var password = null

   account = wx.getStorageSync('account')
   password = wx.getStorageSync('password')

    if (account != null) {
      wx.showToast({
        title: "登陆中...",
        icon: 'loading', //图标，支持"success"、"loading"
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function () {},
        fail: function () {},
        complete: function () {}
      })


      wx.request({
        url: 'https://app.maple.today/MapleSchool/SchoolMain',
        data: {
          requestCode: "001", //当前页
          account: account,
          password: password
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          var result = res.data.result;
          wx.hideLoading();
          if (result == 0) {
            wx.removeStorage({
              key:'account',
            })
            wx.removeStorage({
              key:'password',
            })
            wx.showToast({
              title: "账号密码过期，请重新登陆",
              icon: 'none',
              mask: false,
              duration: 1000,
              success: function () {},
              fail: function () {},
              complete: function () {}
            })
            wx.redirectTo({
              url: '../index/index',
            })
          } else if (result == 1) {
            app.globalData.userinfo = res.data;

            wx.showToast({
              title: "登陆成功",
              icon: 'none',
              mask: false,
              duration: 1000,
              success: function () {},
              fail: function () {},
              complete: function () {}
            })
            wx.redirectTo({
              url: '../studentmain/studentmain',
            })
          } else {
          
            app.globalData.userinfo = res.data;
            wx.showToast({
              title: "企业登陆成功",
              icon: 'none',
              mask: false,
              duration: 1000,
              success: function () {},
              fail: function () {},
              complete: function () {}
            })
            wx.redirectTo({
              url: '../studentmain/studentmain',
            })
          }
        },
        fail: function (err) {
          console.log("error:" + err);
          wx.hideLoading();
          wx.redirectTo({
            url: '../index/index',
          })
        },
        complete: function (e) {
          wx.hideLoading();
        }
      })
    } else {
      setTimeout(function () {
        wx.redirectTo({
          url: '../index/index',
        })
      }, 3000)
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

})