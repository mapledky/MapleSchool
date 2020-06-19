// pages/description/description.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolimage: null,
    schoolHead:null,
    schoolName:null,
    description:null
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
      description:app.globalData.userinfo.description
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