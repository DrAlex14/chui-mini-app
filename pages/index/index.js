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
    popupShow: false
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

    wx.cloud.callFunction({
      name: 'getCredit',
      success: res => {
        let result = res.result.res
        let creditw = result.data.find((item, index, array) => item._openid === getApp().globalData._openidW).credit
        let creditm = result.data.find((item, index, array) => item._openid === getApp().globalData._openidM).credit
        this.setData({
          creditW: creditw,
          creditM: creditm
        })
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
  },
  showPopup() {
    this.setData({ popupShow: true })
  },
  closePopup() {
    this.setData({ popupShow: false });
  },
})
