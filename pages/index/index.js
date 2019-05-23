// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  goTask: function () {
    wx.navigateTo({
      url: 'task/task',
    })
  }
})