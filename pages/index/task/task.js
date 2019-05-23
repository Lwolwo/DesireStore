const taskData = require('../../data/taskData.js')

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
    taskData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  // 计算属性
  computed: {
    todaycheckedNum: {
      require: ['taskData', 'currentbar'],
      fn({ taskData, currentbar }) {
        var result = 0
        taskData.map(function (item) {
          if (item.typeid === currentbar && !item.status && item.today) {
            result++
          }
        })
        return result
      }
    },
    checkedNum: {
      require: ['taskData', 'currentbar'],
      fn({ taskData, currentbar }) {
        var result = 0
        taskData.map(function (item) {
          if (item.typeid === currentbar && item.status) {
            result++
          }
        })
        return result
      }
    }
  },
  // 切换tab事件
  changeTab: function (e) {
    var typeid = e.currentTarget.dataset.typeid
    this.setData({
      currentbar: typeid
    })
  },
  // 复选框选中事件
  checkboxChange: function (e) {
    var taskid = e.currentTarget.dataset.taskid
    var typeid = this.data.taskData[taskid].typeid
    if (typeid === 1 || typeid === 2) {
      // TODO 修改任务的状态
      this.data.taskData[taskid].status = !this.data.taskData[taskid].status
      this.data.taskData[taskid].status ? this.data.checkedNum++ : this.data.checkedNum--
      this.setData({
        taskData: this.data.taskData,
        checkedNum: this.data.checkedNum
      })
    }
  }
})