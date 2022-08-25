
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unfinishedMissions: [],
    releasedMissions: [],
    mission_info_author: wx.getStorageSync('userInfo').openId === getApp().globalData._openidM ? getApp().globalData.userM : getApp().globalData.userW,
    slideButtons: [
      {extClass: 'removeBtn', text: '删除', type: 'warn'},
      {extClass: 'completeBtn', text: '完成', type: 'primary'}
    ]
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
    this.getUnfinishedMissionList();
    this.getReleaseMissionList();
  },
  getUnfinishedMissionList() {
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
  getReleaseMissionList() {
    wx.cloud.callFunction({
      name: 'getReleaseMissionListByOpenid',
      data: {
        openId: wx.getStorageSync('userInfo').openId
      },
      success: res => {
        res.result.res.data.map(i => {
          i.date = i.date.substring(0, 10)
        })
        this.setData({
          releasedMissions: res.result.res.data
        })
      },
    })
  },
  toMissionAddPage() {
    wx.navigateTo({
      url: '/pages/missionadd/missionadd',
    });
  },
  slideButtonTapUpper(index) {
    let currentTarget = index.currentTarget.dataset.index; // 点击的按钮
    let buttonType = index.detail.index; // 点击的操作
    switch(buttonType) {
      case 0: 
        console.log('删除任务');
        wx.cloud.callFunction({
          name: 'removeMission',
          data: {
            _id: this.data.releasedMissions[currentTarget]._id
          },
          success: res => {
            console.log(res);
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1000
            })
            this.getReleaseMissionList();
          }
        })
        break;
      case 1:
        console.log('完成任务');
        let mission = this.data.releasedMissions[currentTarget];
        let openid = wx.getStorageSync('userInfo').openId === getApp().globalData._openidM? getApp().globalData._openidW : getApp().globalData._openidM ;
        console.log(openid);
        wx.cloud.callFunction({
          name: 'updateCredit',
          data: {
            _openid: openid,
            creditAdd: mission.credit - 0
          }
        }).then(() => {
          wx.cloud.callFunction({
            name: 'removeMission',
            data: {
              _id: this.data.releasedMissions[currentTarget]._id
            },
            success: res => {
              console.log(res);
              wx.showToast({
                title: '完成任务',
                icon: 'success',
                duration: 1000
              })
              this.getReleaseMissionList();
            }
          })
        })
        break;
    }
  },
  toDetailPageUpper() {
    console.log('查看任务详情');
  }
})