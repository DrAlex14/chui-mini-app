// pages/missionadd/missionadd.js
import regeneratorRuntime from '../../utils/runtime'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    desc: '',
    maxCredit: getApp().globalData.maxCredit,
    credit: 0,
    toOpenid: ''
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
  // 重置所有表单项
  resetMission() {
    this.setData({
      title: '',
      desc: '',
      credit: 0,
      // list: getApp().globalData.collectionMissionList,
    })
  },

  //数据输入填写表单
  onTitleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },
  onDescInput(e) {
    this.setData({
      desc: e.detail.value
    })
  },
  onCreditInput(e) {
    this.setData({
      credit: e.detail.value
    })
  },

  //保存任务
  async saveMission() {
    // saveMission() {
    // 对输入框内容进行校验
    if (this.data.title === '') {
      wx.showToast({
        title: '标题未填写',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.title.length > 12) {
      wx.showToast({
        title: '标题过长',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.desc.length > 100) {
      wx.showToast({
        title: '描述过长',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (this.data.credit <= 0) {
      wx.showToast({
        title: '一定要有积分',
        icon: 'error',
        duration: 2000
      })
      return
    }else{
        const toOpenid = wx.getStorageSync('userInfo').openId === getApp().globalData._openidM ? getApp().globalData._openidW : getApp().globalData._openidM;
        this.setData({
          toOpenid: toOpenid
        })
        await wx.cloud.callFunction({name: 'addMission', data: this.data}).then(
            () => {
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 1000
                })
            }
        )
        setTimeout(function () {
            wx.navigateBack()
        }, 1000)
    }
  },
})