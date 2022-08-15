import formatTime from '../../utils/util'

// 获取应用实例
const app = getApp()

Page({
  data: {
    howLongDays: 0,
    homeImages: [
      "images/HomeCover01.jpg",
      "images/HomeCover02.jpg",
      "images/HomeCover03.jpg"
    ],
    creditW: 0,
    creditM: 0,

    userW: '',
    userM: '',
  },
  onLoad() {
    this.needLogin();
  },
  onShow() {
    this.calcHowLongDays();
    this.setData({
      userW: getApp().globalData.userW,
      userM: getApp().globalData.userM,
    })

    // 测试openid
    const user = wx.getStorageSync('userInfo');
    if (user.openId === getApp().globalData._openidM) {
      this.setData({
        userM: getApp().globalData.userM + user.openId
      })
    } else {
      this.setData({
        userW: getApp().globalData.userW + user.openId
      })
    }
    wx.cloud.callFunction({
      name: 'getcredit',
      success: res => {
        console.log(res);
      }
    })
  },

  // methods
  
  // 计算在一起时间
  calcHowLongDays() {
    let today = new Date();
    let firstDay = Date.parse('2020-11-22');
    let howLongDays = Math.floor(parseInt(today - firstDay) / (1000 * 60 * 60 * 24));
    this.setData({
      howLongDays: howLongDays
    })
  },

  // 判断有无登录
  needLogin() {
    if ( !wx.getStorageSync('userInfo') ) {
      wx.switchTab({
        url: '/pages/mine/mine',
      });
    }
  }
})
