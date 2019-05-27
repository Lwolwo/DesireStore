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
    taskData: [],
    checkedShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userData: wx.getStorageSync('userData'),
      taskData: wx.getStorageSync('taskData')
    })
  },
  // 数据监听器
  watch: {
    currentbar: function (newVal) {
      switch (newVal) {
        case 0: this.setData({reward: [2, 4, 6, 8]}); break  // 日常任务
        case 1: this.setData({reward: [2, 4, 6, 8]}); break  // 主线任务
        case 2: this.setData({reward: [1, 3, 5, 7]}); break  // 支线任务
      }
    }
  },
  // 计算属性
  computed: {
    expiredNum: {
      require: ['taskData', 'currentbar'],
      fn({ taskData, currentbar }) {
        var result = 0
        taskData.forEach(item => {
          if (item.typeid === currentbar && item.status.expired) {
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
        taskData.forEach(item => {
          if (item.typeid === currentbar && item.status.finished) {
            result++
          }
        })
        return result
      }
    }
  },
  todaycheckedShowChange: function () {
    this.setData({
      todaycheckedShow: !this.data.todaycheckedShow
    })
  },
  checkedShowChange: function () {
    this.setData({
      checkedShow: !this.data.checkedShow
    })
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
    var taskindex = e.currentTarget.dataset.taskindex
    console.log(e.currentTarget.dataset.taskindex)
    var user = this.data.userData
    var task = this.data.taskData
    var item = task[taskindex]

    // 处理任务次数逻辑
    item.checkcount++
    item.status.today = true
    if (item.checkcount === item.count) {
      item.status.finished = true
    }
    task[taskindex] = item

    // 处理任务奖励逻辑
    var money = 0
    money = this.data.reward[item.difficulty]
    user.money += money

    // 修改数据，渲染列表
    this.setData({
      userData: user,
      taskData: task
    })

    // 修改对应Storage
    wx.setStorageSync('taskData', this.data.taskData)
    wx.setStorageSync('userData', this.data.userData)
  }
})