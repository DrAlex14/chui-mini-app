
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unfinishedMissions: [],
    releasedMissions: [],
    mission_info_author: wx.getStorageSync('userInfo').openId === getApp().globalData._openidM ? getApp().globalData.userM : getApp().globalData.userW
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
    wx.cloud.callFunction({
      name: 'getUnfinishedMissionListByOpenid',
      data: {
        toOpenId: wx.getStorageSync('userInfo').openId
      },
      success: res => {
        res.result.res.data.map(i => {
          i.date = i.date.substring(0, 10)
        })
        this.setData({
          unfinishedMissions: res.result.res.data
        })
      },
    })
  },
  toMissionAddPage() {
    wx.navigateTo({
      url: '/pages/missionadd/missionadd',
    });
      
  }
})