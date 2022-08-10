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
    creditA: 0,
    creditB: 0,

    userA: '',
    userB: '',
  },
  onLoad() {

  },
  onShow() {
    this.calcHowLongDays();
    this.setData({
      userA: getApp().globalData.userA,
      userB: getApp().globalData.userB,
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
  }
})
