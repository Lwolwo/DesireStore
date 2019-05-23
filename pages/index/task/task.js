const taskData = require('../../data/taskData.js')

const watch = require('../../util/watch.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigation: [
      {typeid: 0, title: '日常任务'},
      {typeid: 1, title: '主线任务'},
      {typeid: 2, title: '支线任务'}
    ],
    currentbar: 0,
    reward: [2, 4, 6, 8],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    watch.setWatcher(this)  // 设置监听器
    this.setData({
      taskData: taskData.taskData,
    })
  },
  // 数据监听器
  watch: {
    currentbar: function (newVal) {
      switch (newVal) {
        case 0: this.setData({reward: [2, 4, 6, 8]}); break
        case 1: this.setData({reward: [2, 4, 6, 8]}); break
        case 2: this.setData({reward: [1, 3, 5, 7]}); break
      }
    }
  },
  // 切换tab事件
  changeTab: function (e) {
    var typeid = e.currentTarget.dataset.typeid
    this.setData({
      currentbar: typeid
    })
  }
})