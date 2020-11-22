import {request} from "../../request/request"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cid: 0,  // 分类数据
    pagenum: 0,  // 商品分页
    tabList: ['综合','销售','价格'],  // 导航栏标签
    goodsList: [],  // 商品数据
    pushTime: [],  // 时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options 中可以获取 navigator 标签url中传递过来的参数
    this.setData({
      cid: options.cid
    })
    this.getGoodsList()
  },
  // 商品请求
  getGoodsList(){
    request({
      url: '/goods/search',
      cid: this.data.cid,
      pagenum: this.data.pagenum
    }).then(res => {
      this.setData({
        pagenum: res.data.message.pagenum,  // 获取下一页页数
        goodsList: res.data.message.goods,  // 商品数据
      })
    })
  },

  // 导航栏切换
  toggle(e){
  },

  // 图片加载错误 回调函数
  errorLoad(e){
    console.log(11);
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