const { patchPage, patchComponent } = require('./pages/util/miniprogrampatch.js')

Page = patchPage(Page)
Component = patchComponent(Component)

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'mycloud-76061c',
        //我刚刚从云开发控制台里复制过来的自己的环境ID，
        traceUser: true,
      })
    }
    this.globalData = {}
    // 获取用户openid
    this.onGetOpenid()
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.globalData.openid = res.result.openid
        // 从云端获取用户信息，若没有则创建新用户
        this.onGetUserInfo()
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  onGetUserInfo: function () {
    const db = wx.cloud.database()
    db.collection('userData').where({
      _openid: this.globalData.openid
    }).get({
      success: res => {
        if (res.data.length) {
          console.log('[数据库] [查询记录] 成功' + res.data[0])
          wx.setStorageSync('userData', res.data[0])
          if (this.getUserDataCallback) {
            this.getUserDataCallback()
          }
          this.onQuery('taskData')
          this.onQuery('desireData')
        }
        else {
          console.log('[数据库] [查询记录] 成功 云端没有该用户信息，建立新用户')
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
  },
  onQuery: function (table) {
    const db = wx.cloud.database()
    // 查询当前用户的所有任务
    db.collection(table).where({
      _openid: this.globalData.openid
    }).get({
      success: res => {
        wx.setStorageSync(table, res.data)
      },
      fail: err => {
        console.error('[数据库] [查新记录] 失败', err)
      }
    })
  },
  // 小程序被切到后台，提交数据到云端
  onHide: function () {
    const db = wx.cloud.database()
    // 更新userData
    var userData = wx.getStorageSync('userData')
    db.collection('userData').doc(userData._id).update({
      data: {
        money: userData.money
      },
      success: res => {
        console.log('[数据库] [更新记录] 成功 ' + res)
      },
      fail: err => {
        console.error('[数据库] [更新记录] 失败 ', err)
      }
    })

    // 更新taskData
    var taskData = wx.getStorageSync('taskData')
    taskData.forEach(item => {
      db.collection('taskData').doc(item._id).update({
        data: {
          status: item.status,
          today: item.today,
          failed: item.failed,
          checkcount: item.checkcount
        },
        success: res => {
          console.log('[数据库] [更新记录] 成功 ' + res)
        },
        fail: err => {
          console.error('[数据库] [更新记录] 失败 ', err)
        }
      })
    })

    // 更新desireData
    var desireData = wx.getStorageSync('desireData')
    desireData.forEach(item => {
      db.collection('desireData').doc(item._id).update({
        data: {
          'get': item['get']
        },
        success: res => {
          console.log('[数据库] [更新记录] 成功 ' + res)
        },
        fail: err => {
          console.log('[数据库] [更新记录] 失败 ' + err)
        }
      })
    })
  }
})