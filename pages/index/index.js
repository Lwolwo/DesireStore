const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  onLoad: function (options) {
    if (wx.getStorageSync('userData')) {
      this.setData({
        userData: wx.getStorageSync('userData')
      })
    }
    else {
      app.getUserDataCallback = () => {
        this.setData({
          userData: wx.getStorageSync('userData')
        })
      }
    }
    
  },
  onShow: function (options) {
    this.setData({
      userData: wx.getStorageSync('userData')
    })
  },
  goTask: function () {
    wx.navigateTo({
      url: 'task/task',
    })
  },
  goStore: function () {
    wx.navigateTo({
      url: 'store/store',
    })
  }
})