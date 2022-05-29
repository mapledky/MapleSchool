// pages/studentmain/studentmain.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolHead: null,
    schoolName: null,
    schoolimage: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var head = app.globalData.userinfo.schoolhead;
    if (head == "original") {
      //未定义头像
      this.setData({
        schoolHead: "../../image/logo.png",
      })
    } else {
      this.setData({
        schoolHead: head,
      })
    }
    var school_image = null;
    if (app.globalData.userinfo.image != "original") {
      school_image = app.globalData.userinfo.image.split("&")
    }

    this.setData({
      schoolimage: school_image,
      schoolName: app.globalData.userinfo.schoolname,
    })
  },

  toImage:function(e) {
    var index = e.currentTarget.dataset.index
    var that = this
    wx.previewImage({
      current:that.data.schoolimage[index],
      urls: that.data.schoolimage,
    })
  },

  //进入云选课
  chooseClass: function () {
    wx.navigateTo({
      url: '../chooseClass/chooseclass',
    })
  },
  //查看学校简介

  description:function(){
    wx.navigateTo({
      url: '../description/description',
    })
  },
  

  //查看关于平台
  about:function(){
    wx.navigateTo({
      url: '../about/about',
    })
  },
  //前往个人中心
  toPerson: function () {
    wx.navigateTo({
      url: '../person/person',
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
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '枫叶云校园',
      path: '/pages/splash/splash',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})