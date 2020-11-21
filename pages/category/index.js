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
  },

  Cate: [],  // 用于存放分类总数据

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCate()
  },

  // 网络请求
  getCate(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'
    }).then(res => {
      this.Cate = res.data.message
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
        rightContent: this.Cate[activeIndex].children
      })
    }
    this.setData({
      toggleIndex: e.currentTarget.dataset.index
    })
  }
})