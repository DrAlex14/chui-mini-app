// pages/missionadd/missionadd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    desc: '',
    maxCredit: getApp().globalData.maxCredit,
    credit: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onCreditInput(e) {
    this.setData({
      credit: e.detail.value
    })
  },
})