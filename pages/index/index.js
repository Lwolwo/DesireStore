const userData = require('../data/userData.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  onLoad: function (options) {
    this.setData({
      userData: userData.userData
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