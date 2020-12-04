import {request} from "../../request/request"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cid: 0,  // 分类数据
    pagenum: 1,  // 商品分页
    tabList: [
      {
        text: '综合',
        active: true
      },
      {
        text: '销售',
        active: false
      },
      {
        text: '价格',
        active: false
      }
    ],  // 导航栏标签
    goodsList: [],  // 商品数据
    sumPages: 0,  // 总页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options 中可以获取 navigator 标签url中传递过来的参数
    this.setData({
      cid: options.cid
    })
    console.log(this.data.cid);
    
    this.getGoodsList()
  },
  // 商品请求
  getGoodsList(){
    request({
      url: '/goods/search',
      data: {
        cid: this.data.cid,
        pagenum: this.data.pagenum,
        pagesize: 20
      }
    }).then(res => {      
      this.setData({ 
        sumPages: Math.ceil(res.data.message.total / 20), // 总页数
        // ... 解构上一次数据内容
        // 解构目前获取到的数据内容   两者进行一次拼接
        // 得到一个完整的数组
        goodsList: [...this.data.goodsList,...res.data.message.goods],  // 商品数据
      })
      this.data.pagenum++
      wx.stopPullDownRefresh();  // 关闭下拉加载
    })
  },

  // 导航栏切换
  toggle(e){
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 刷新页面
    // 清空数组
    this.setData({
      goodsList: []
    })
    this.data.pagenum = 1;  // 重置页码
    this.getGoodsList();  // 发送请求
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 说明没有更多数据
    if (this.data.pagenum > this.data.sumPages) {
      // 提示框组件
      wx.showToast({
        title: '没有更多啦',
        icon: "none"
      })
    } else {
      this.getGoodsList();
      // this.data.pagenum++
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})