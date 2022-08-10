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

      // if (day.type === 'start') {
      //   day.bottomInfo = '入住';
      // } else if (day.type === 'end') {
      //   day.bottomInfo = '离店';
      // }

      return day;
    },
    calendarShow: false,
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
  }
})
