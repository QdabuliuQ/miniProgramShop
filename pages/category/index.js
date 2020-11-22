// 网络请求
import {request} from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],  // 左侧菜单数据
    rightContent: [],  // 右侧商品数据
    activeIndex: 0,  // 菜单栏索引
    toggleIndex: 0,
    scrollY: 0,  // 右侧滚动距离
  },

  Cate: [],  // 用于存放分类总数据

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 通过 wx.getStorageSync('key') 来获取本地数据
    const Cates = wx.getStorageSync('cates')
    // 判断本地数据是否为空
    // 如果为空则发送请求
    if (!Cates) {
      this.getCate()
    // 否则使用本地数据
    } else {
      // 获取当前时间戳
      // 减去请求数据时候的时间戳  如果大于某一个时间  则重新发起请求
      if (Date.now() - Cates.time > 1000 * 300) {
        this.getCate()
      // 如果没有超出时间  使用旧数据
      } else {
        this.Cate = Cates.data
        let leftMenuList = this.Cate.map( v => v.cat_name )  // map 方法遍历出符合条件的元素
        let rightContent = this.Cate[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  // 网络请求
  getCate(){
    request({
      url: '/categories'
    }).then(res => {
      this.Cate = res.data.message
      // 通过 wx.setStorageSync('key', data) 将请求到数据存储到本地中
      // data 中设置属性 time 时间戳
      // data：请求回来的数据
      wx.setStorageSync('cates', {time: Date.now(), data: this.Cate})
      let leftMenuList = this.Cate.map( v => v.cat_name )  // map 方法遍历出符合条件的元素
      let rightContent = this.Cate[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },

  // 导航栏切换
  toggleMenu(e){
    if (this.data.toggleIndex !== e.currentTarget.dataset.index) {
      console.log(1);
      
      let activeIndex = e.currentTarget.dataset.index // 获取索引
      this.rightContent = [];  // 清空商品数组
      this.setData({
        activeIndex,
        rightContent: this.Cate[activeIndex].children,
        scrollY: 0  // 切换导航栏后重置右侧滚动位置
      })
    }
    this.setData({
      toggleIndex: e.currentTarget.dataset.index
    })
  }
})