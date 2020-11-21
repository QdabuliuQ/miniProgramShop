//index.js
//获取应用实例
const app = getApp()
// 网络请求
import {request} from "../../request/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],  // 轮播图数据
    navList: [],  // 导航栏数据
    floorList: [],  // 楼层数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
  },

  // 获取轮播图
  getSwiperList(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'
    }).then(res => {
      this.setData({
        swiperList: res.data.message
      })
    })
  },
  // 获取导航栏数据
  getNavList(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'
    }).then(res => {
      this.setData({
        navList: res.data.message
      })
    })
  },
  // 获取楼层数据
  getFloorList(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'
    }).then(res => {
      this.setData({
        floorList: res.data.message
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
