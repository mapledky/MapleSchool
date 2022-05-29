// pages/mycourse/mycourse.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: null,
    randomColorArr: ["#e4f77a", "#B1DCFF", "#FFDC65"],
    registerNumber: 0,
    mycourseData: null,
    presentData:null,
    choosecourse: null,
    userinfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_id: app.globalData.userinfo.Id,
      userinfo:app.globalData.userinfo
    })
    this.refreshData();
  },

  refreshData: function () {
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
        requestCode: "006", //当前页
        user_id: that.data.user_id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading();

        console.log(res.data)
        var data = res.data;
          var number = 0;
          for (var i = 0; i < data.length; i++) {
            if (data[i].cover == "original") {
              data[i].cover = "../../image/logo.png"
            }
            number++;
          }
          //将data置换
          data.reverse()
          var classData=[];
          for(var i=0;i<data.length;i++){
            if(i<10){
              classData.push(data[i])
            }
          }

          that.setData({
            presentData:classData,
            mycourseData: data,
            registerNumber: number
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

   /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.presentData.length < this.data.mycourseData.length) {
      var num = 0;
      var classData = this.data.presentData;
      for (var i = this.data.presentData.length; i < this.data.mycourseData.length; i++) {
        classData.push(this.data.mycourseData[i]);
        num++;
        if (num == 10) {
          break;
        }
      }
      this.setData({
        presentData:classData,
      })
    } else {
      wx.showToast({
        title: '没有更多课程了哦',
      })
    }
  },

  chooseCourse: function (e) {
    var courseId = e.currentTarget.dataset.course
    wx.navigateTo({
      url: '../courseDetail/courseDetail?courseId=' + courseId,
    })
  },

  cancelRegister: function () {
    wx.showToast({
      title: "取消中...",
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
        requestCode: "005", //当前页
        user_id: that.data.user_id,
        course_id: that.data.choosecourse,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading();
        var data = res.data.result;
        switch (data) {
          case "0":
            wx.showToast({
              title: "课程报名已截止，无法取消哦",
              icon: 'none',
              duration: 3000,
              mask: false,
              success: function () {},
              fail: function () {},
              complete: function () {}
            })
            break;
          case "1":
            wx.showToast({
              title: "取消成功",
              icon: 'none',
              duration: 3000,
              mask: false,
              success: function () {},
              fail: function () {},
              complete: function () {}
            })
            that.refreshData();
            break;
          case "2":
            wx.showToast({
              title: "你暂未报名该课程",
              icon: 'none',
              duration: 3000,
              mask: false,
              success: function () {},
              fail: function () {},
              complete: function () {}
            })
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
  },


  cancel: function (e) {
    var that = this;
    this.setData({
      choosecourse: e.currentTarget.dataset.course
    })

    wx.showModal({
      title: '提示',
      content: '确定取消报名该课程？',
      success: function (e) {
        if (e.confirm) {
          // 用户点击了确定 
          that.cancelRegister();
        } else if (e.cancel) {

        }
      },
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