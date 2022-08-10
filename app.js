// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: 'chuiminiapp-cloud-9etszwb86cb355',
      traceUser: true
    })
  },
  globalData: {
    // userInfo: null
    userA: '大锤',
    userB: '美丽'
  }
})
