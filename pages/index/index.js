//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isTipTrue: false,
    checkSrc: '../../image/check_not.png',
    passwordstyle:true,
    passwordeye:'../../image/eye.png',
    account: "",
    password: "",
  },

  passwordlook:function(){
    this.data.passwordstyle = !this.data.passwordstyle
    if(this.data.passwordstyle){
      this.data.passwordeye = '../../image/eye.png'
    } else {
      this.data.passwordeye = '../../image/eyeclose.png'
    }
    this.setData({
      passwordstyle:this.data.passwordstyle,
      passwordeye:this.data.passwordeye
    })
  },

  onLoad: function (options) {

    let self = this
    wx.showModal({
      title: '用户协议',
      content: '枫叶云校园旨在服务校园业务处理，包括线上选课，新闻公布，在线授课等。目前枫叶云校园仅开放企业用户统一注册，个人用户暂时不能注册使用枫叶云校园。企业用户统一注册后，可获得用户登录信息，登录后可查看相关课程信息，或进行相关修改。枫叶云校园为了给您提供更好的服务，请您务必遵守枫叶云校园的相关使用协议，如若违反，枫叶云校园保有拒绝服务的权利。',
      success: function (e) {
        if (e.confirm) {
          // 用户点击了确定 

          self.setData({
            isTipTrue: true,
            checkSrc: '../../image/check.png'
          })
        } else if (e.cancel) {

        }
      },
    })
  },
  onCheckClicked: function () {
    if (this.data.isTipTrue) {
      this.setData({
        isTipTrue: false,
        checkSrc: '../../image/check_not.png'
      })
    } else {
      this.setData({
        isTipTrue: true,
        checkSrc: '../../image/check.png'
      })
    }
  },

  getAccount: function (e) {
    var val = e.detail.value;
    this.setData({
      account: val
    })

  },

  getPassword: function (e) {
    var val = e.detail.value;
    this.setData({
      password: val
    })
  },


  login: function () {
    //  登陆
    var account_value = this.data.account;
    var password_value = this.data.password;
    if (account_value == "" || password_value == "") {
      wx.showToast({
        title: "请输入账号或密码",
        icon: 'none', //图标，支持"success"、"loading"
        duration: 1000, //提示的延迟时间，单位毫秒，默认：1500 
        mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function () {},
        fail: function () {},
        complete: function () {}
      })
    } else if (!this.data.isTipTrue) {
      wx.showToast({
        title: "请勾选用户协议",
        icon: 'none', //图标，支持"success"、"loading"
        duration: 1000, //提示的延迟时间，单位毫秒，默认：1500 
        mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function () {},
        fail: function () {},
        complete: function () {}
      })
    } else {
      //登陆请求
      wx.showToast({
        title: "登录中...",
        icon: 'loading', //图标，支持"success"、"loading"
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function () {},
        fail: function () {},
        complete: function () {}
      })

      var that = this
      wx.request({
        url: 'https://site.maple.today/MapleSchool/SchoolMain',
        data: {
          requestCode: "001", //当前页
          account: this.data.account,
          password: this.data.password
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          var result = res.data.result;
          wx.hideLoading();
          if (result == 0) {
            wx.showToast({
              title: "账号或密码错误",
              icon: 'none',
              mask: false,
              duration: 1000,
              success: function () {},
              fail: function () {},
              complete: function () {}
            })
          } else if (result == 1) {
            wx.setStorage({
              data: that.data.account,
              key: 'account'
            })
            wx.setStorage({
              data: that.data.password,
              key: 'password',
            })
            app.globalData.userinfo = res.data;
            console.log(res.data)
            wx.showToast({
              title: "登录成功",
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
            wx.setStorage({
              data: that.data.account,
              key: 'account',
            })
            wx.setStorage({
              data: that.data.password,
              key: 'password',
            })
            app.globalData.userinfo = res.data;
            wx.showToast({
              title: "企业登录成功",
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
        },
        complete: function (e) {
          wx.hideLoading();
        }
      })
    }
  },


  toAgreement: function () {
    wx.navigateTo({
      url: '../agreement/agreement',
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

})