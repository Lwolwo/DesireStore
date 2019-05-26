// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindGetUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    const db = wx.cloud.database()
    db.collection('userData').add({
      data: {
        level: 0,
        money: 0,
        username: app.globalData.userInfo.nickName
      },
      success: res => {
        console.log('新用户创建成功，远程数据库新增用户......将用户信息存入本地Storage')
        db.collection('userData').where({
          _openid: app.globalData.openid
        }).get({
          success: res => {
            wx.setStorageSync('userData', res.data[0])
            wx.showToast({
              title: '登陆成功',
              duration: 1500,
              mask: true,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1500);
              }
            })
          },
          fail: err => {
            console.log('用户创建完毕，但重新获取云端用户信息失败' + err)
          }
        })
      },
      fail: err => {
        console.log('新用户创建失败')
      }
    })
  }
})