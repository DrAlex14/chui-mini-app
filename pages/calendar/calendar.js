// logs.js

Page({
  data: {
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
  onShow() {
    // 计算生日
    this.calcBirthDay()
  },
  onLoad() {
    
  },
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
  }
})
