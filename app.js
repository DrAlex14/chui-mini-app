// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: 'chuiminiapp-cloud-9etszwb86cb355',
      traceUser: true
    })
  },
  globalData: {
    //记录使用者的openid
    _openidM: 'o7KsM5b9BsT1U-jg23wcgGAWkIoc',
    _openidW: 'o7KsM5TouXfxcwchD6r6qKr9IFwE',

    //记录使用者的名字
    userM: '大锤',
    userW: '美丽',

    //最多单次交易积分
    maxCredit: 500,
  }
})
