import formatTime from '../../utils/util'

// 获取应用实例
const app = getApp()

Page({
  data: {
    howLongDays: 0,
  },
  onLoad() {

  },
  onShow() {
    this.calcHowLongDays();
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
