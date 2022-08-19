// index.js

// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    openId: '',
    needLogin: true,
    myCredit: 0,
    unfinishedMissions: [],
    releasedMissions: [],
  },
  onLoad() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        needLogin: false,
        userInfo: userInfo
      })
    }
  },
  onShow() {
    wx.cloud.callFunction({
      name: 'getCreditByOpenid',
      data: {
        openId: wx.getStorageSync('userInfo').openId
      },
      success: res => {
        this.setData({
          myCredit: res.result.res.data[0].credit
        })
      }
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        res.userInfo.openId = this.data.openId
        this.setData({
          userInfo: res.userInfo,
          needLogin: false
        })
        wx.setStorageSync('userInfo', this.data.userInfo);
      }
    })
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        console.log('调用云函数成功');
        console.log(res);
        this.setData({
          openId: res.result.openid
        })
      },
      fail: err => {
        console.log('调用失败'+ err);
      }
    })
  }
})
