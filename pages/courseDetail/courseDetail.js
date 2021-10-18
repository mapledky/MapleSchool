// pages/courseDetail/courseDetail.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseId: null,
    courseDetail: null,
    phonenumber: null,
    isShowConfirm: false,
    originalPic: "https://site.maple.today/mapleschool/2/head/head.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseId: options.courseId,
    })
    wx.showToast({
      title: "加载中...",
      icon: 'loading', //图标，支持"success"、"loading"
      mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false 
      success: function () {},
      fail: function () {},
      complete: function () {}
    })
    var that = this;
    wx.request({
      url: 'https://site.maple.today/MapleSchool/SchoolMain',
      data: {
        requestCode: "003", //当前页
        courseId: that.data.courseId,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading();
        var data = res.data[0];
        if (data.cover == "original") {
          data.cover = "../../image/logo.png"
        }

        that.setData({
          courseDetail: data
        })
      },
      fail: function (err) {
        console.log("error:" + err);
        wx.hideLoading();

      },
      complete: function (e) {
        wx.hideLoading();
      }
    })
  },

  inputSearch: function (e) {
    let that = this
    that.setData({
      searchValue: e.detail.value
    })
  },
  register: function (e) {
    var that = this
    that.setData({
      isShowConfirm: true,
    })
  },

  setValue: function (e) {
    this.setData({
      phonenumber: e.detail.value
    })
  },
  cancel: function () {
    var that = this
    that.setData({
      isShowConfirm: false,
    })
  },
  confirmAcceptance: function () {
    var that = this
    that.setData({
      isShowConfirm: false,
    })

    if (this.data.phonenumber != null && this.data.phonenumber != "") {
      console.log(this.data.phonenumber)
      wx.showToast({
        title: "加载中...",
        icon: 'loading', //图标，支持"success"、"loading"
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function () {},
        fail: function () {},
        complete: function () {}
      })
      var that = this;
      wx.request({
        url: 'https://site.maple.today/MapleSchool/SchoolMain',
        data: {
          requestCode: "004", //当前页
          courseId: that.data.courseId,
          user_id: app.globalData.userinfo.Id,
          phoneNumber: that.data.phonenumber
        },

        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.hideLoading();

          switch (res.data.result) {
            case "0":
              wx.showToast({
                title: "课程报名已经截止",
                icon: 'none',
                duration: 3000,
                mask: false,
                success: function () {},
                fail: function () {},
                complete: function () {}
              })
              break;
            case "1":
              wx.showModal({
                title: '提示',
                content: '已成功报名该课程！',
                success: function () {},
                fail: function () {},
                complete: function () {}
              })
              break;
            case "2":
              wx.showToast({
                title: "课程还未开始报名",
                icon: 'none',
                duration: 3000,
                mask: false,
                success: function () {},
                fail: function () {},
                complete: function () {}
              })
              break;
            case "3":
              wx.showToast({
                title: "课程报名人数达到限制",
                icon: 'none',
                duration: 3000,
                mask: false,
                success: function () {},
                fail: function () {},
                complete: function () {}
              })
              break;
            case "4":
              wx.showToast({
                title: "该课程暂时无法报名",
                icon: 'none',
                duration: 3000,
                mask: false,
                success: function () {},
                fail: function () {},
                complete: function () {}
              })
              break;
            case "5":
              wx.showToast({
                title: "你当前所选的课程已达到最大的选课数目",
                icon: 'none',
                duration: 3000,
                mask: false,
                success: function () {},
                fail: function () {},
                complete: function () {}
              })
              break;
            case "6":
              wx.showToast({
                title: "你已经报名该课程啦，无需重复报名",
                icon: 'none',
                duration: 3000,
                mask: false,
                success: function () {},
                fail: function () {},
                complete: function () {}
              })
              break;
            case "7":
              wx.showToast({
                title: "该课程并非你学校的课程哦",
                icon: 'none',
                duration: 3000,
                mask: false,
                success: function () {},
                fail: function () {},
                complete: function () {}
              })
              break;
              case "8":
                wx.showToast({
                  title: "该课程并非为对应年级课程",
                  icon: 'none',
                  duration: 3000,
                  mask: false,
                  success: function () {},
                  fail: function () {},
                  complete: function () {}
                })
                break;
            default:
              break;
          }
        },
        fail: function (err) {
          console.log("error:" + err);
          wx.hideLoading();

        },
        complete: function (e) {
        }
      })
    } else {
      wx.showToast({
        title: "请输入正确的电话号码",
        icon: 'none', //图标，支持"success"、"loading"
        duration: 1000, //提示的延迟时间，单位毫秒，默认：1500 
        mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function () {},
        fail: function () {},
        complete: function () {}
      })
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