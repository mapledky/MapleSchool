// pages/person/person.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      name:null,
      Id:null,
      maxcourse:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        name:app.globalData.userinfo.username,
        Id:app.globalData.userinfo.Id,
        maxcourse:app.globalData.userinfo.limit,
      })
  },

  logout:function(){
    wx.showModal({
      title: '提示',
      content: '是否退出登录枫叶云校园？',
      success: function (e) {
        if (e.confirm) {
          // 用户点击了确定 
          wx.removeStorage({
            key: 'account',
          })
          wx.removeStorage({
            key:'password',
          })
          
          wx.reLaunch({
            url: '../index/index',
          })
        } else if (e.cancel) {

        }
      },
    })
  },

  about:function(){
    wx.navigateTo({
      url: '../../pages/about/about',
    })
  },
  agreement:function(){
    wx.navigateTo({
      url: '../../pages/useragreement/useragreement',
    })
  },

  mycourse:function(){
    wx.navigateTo({
      url: '../../pages/mycourse/mycourse',
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