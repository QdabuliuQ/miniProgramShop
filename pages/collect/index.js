// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsList: [
      {
        text: '收藏店铺',
        active: false
      },
      {
        text: '收藏商品',
        active: true
      },
      {
        text: '关注商品',
        active: false
      },
      {
        text: '我的足迹',
        active: false
      },
    ],
    
    goodsList: [],  // 商品数组
  },
  isToggleTab: false,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!this.isToggleTab) {
      let pages = getCurrentPages();  // 获取页面栈数组
      let index = pages[pages.length - 1].options.index;  // 获取传递的参数
      let tabsList = this.data.tabsList
      // 遍历导航栏 全部设置为不选中
      tabsList.forEach(item => {
        item.active = false
      });
      // 设置点击项为选中
      tabsList[index].active = true
      this.setData({
        tabsList
      })
      this.goodsContainer(index)
    }
  },

  toggle(e){
    let index = e.detail;  // 点击索引
    this.goodsContainer(index.toString())
  },

  goodsContainer(index){
    // switch 判断点击了哪个菜单
    switch (index) {
      case "0":
        this.isToggleTab = true
        this.setData({
          goodsList: []
        })
        break;
      case "1":
        this.isToggleTab = true
        let goodsList = wx.getStorageSync('collect')||[]
        this.setData({
          goodsList
        })
        break;
      case "2":
        this.isToggleTab = true
        this.setData({
          goodsList: []
        })
        break;
      case "3":
        this.isToggleTab = true
        let browseList = wx.getStorageSync('browse')||[]
        this.setData({
          goodsList: browseList
        })
        break;
      default:
        break;
    }
  }
})