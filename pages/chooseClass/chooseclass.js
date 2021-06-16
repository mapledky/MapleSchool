// pages/chooseClass/chooseclass.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: null,
    allclassdata: [],
    randomColorArr: ["#e4f77a", "#B1DCFF", "#FFDC65"],
    presentclassdata: [],
    cacheclassdata: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        requestCode: "002", //当前页
        school: app.globalData.userinfo.school,
        grade:app.globalData.userinfo.grade
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading();
        var data = res.data;
        for (var i = 0; i < data.length; i++) {
          if (data[i].cover == "original") {
            data[i].cover = "../../image/logo.png"
          }
        }

        var classData = []
        for (var i = 0; i < data.length; i++) {
          if (i <10) {
            classData.push(data[i]);
          } else {
            break;
          }
        }

        that.setData({
          allclassdata: data,
          presentclassdata: classData,
          cacheclassdata: classData
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
    if (this.data.searchValue == "") {
      that.setData({
        presentclassdata: that.data.cacheclassdata
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.presentclassdata.length < this.data.allclassdata.length) {
      var num = 0;
      var classData = this.data.presentclassdata;
      for (var i = this.data.presentclassdata.length; i < this.data.allclassdata.length; i++) {
        classData.push(this.data.allclassdata[i]);
        num++;
        if (num == 10) {
          break;
        }
      }
      this.setData({
        presentclassdata:classData,
        cacheclassdata:classData
      })
    } else {
      wx.showToast({
        title: '没有更多课程了哦',
      })
    }
  },

  searchCourse: function (e) {
    if (this.data.searchValue != "") {
      var that = this;
      wx.showToast({
        title: "加载中...",
        icon: 'loading', //图标，支持"success"、"loading"
        mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false 
        success: function () {},
        fail: function () {},
        complete: function () {}
      })
      wx.request({
        url: 'https://site.maple.today/MapleSchool/SchoolMain',
        data: {
          requestCode: "003", //当前页
          courseId: that.data.searchValue,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.hideLoading();
          var data = res.data;
          if (data[0].result != "0") {
            for (var i = 0; i < data.length; i++) {
              if (data[i].cover == "original") {
                data[i].cover = "../../image/logo.png"
              }
            }
            that.setData({
              presentclassdata: data
            })
          } else {
            wx.showToast({
              title: "没有这门课程哦",
              icon: 'success', //图标，支持"success"、"loading"
              mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false 

              success: function () {},
              fail: function () {},
              complete: function () {}
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

  chooseCourse: function (e) {
    var courseId = e.currentTarget.dataset.course
    wx.navigateTo({
      url: '../courseDetail/courseDetail?courseId=' + courseId,
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
   * 用户点击右上角分享
   */

})