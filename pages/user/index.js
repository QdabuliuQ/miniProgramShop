// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    isUserDetail: false,
    collect_count: 0,  // 收藏商品数量
    browse_count: 0,  // 浏览商品数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let collect_count = wx.getStorageSync('collect').length
    let browse_count = wx.getStorageSync('browse').length
    this.setData({
      collect_count,
      browse_count
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = wx.getStorageSync('userinfo')||null  // 获取缓存中的用户数据
    if (userInfo == null) {
      this.setData({
        isUserDetail: false
      })
    } else {
      this.setData({
        userInfo,
        isUserDetail: true
      })
    }
  },

  toLogin(){
    wx.navigateTo({
      url: '/pages/auth/index',
    })
  }
})