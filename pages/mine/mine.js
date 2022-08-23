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
    formatter(day) {
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();

      if (month === 10) {
        if (date === 21) {
          day.bottomInfo = '美丽的生日';
        } else if (date === 1) {
          day.bottomInfo = '旅游企画';
        } 
      }
      if (month === 7) {
        if (date === 30) {
          day.bottomInfo = '大锤哥的生日'
        }
      }
      if (month === 11) {
        if (date === 22) {
          day.bottomInfo = '恋爱纪念日'
        }
      }
      return day;
    },
    calendarShow: false,
    userWBirthDayLeft: 0,
    userMBirthDayLeft: 0
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
    // 计算生日
    this.calcBirthDay()
  },
  //---------------日期---------------
  calendarClose() {
    this.setData({
      calendarShow: false
    })
  },
  handleCalendarShow() {
    this.setData({
      calendarShow: true
    })
  },
  // 计算生日
  getDaysToBirthday(month, day) {
    let nowTime = new Date();
    let thisYear = nowTime.getFullYear();
    //今年的生日
    let birthday = new Date(thisYear, month - 1, day);

    //今年生日已过，则计算距离明年生日的天数
    if (birthday < nowTime) {
        birthday.setFullYear(nowTime.getFullYear() + 1);
    }
    let timeDec = birthday - nowTime;
    let days = timeDec / (24 * 60 * 60 * 1000);
    return Math.ceil(days);
  },
  calcBirthDay() {
    let userWBirthDayLeft = this.getDaysToBirthday(10, 21);
    let userMBirthDayLeft = this.getDaysToBirthday(7, 30);
    this.setData({
      userMBirthDayLeft: userMBirthDayLeft,
      userWBirthDayLeft: userWBirthDayLeft
    })
  },
  //---------------日期---------------
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
