import {request} from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        text: '全部',
        active: true
      },
      {
        text: '待付款',
        active: false
      },
      {
        text: '待发货',
        active: false
      },
      {
        text: '退款/退货',
        active: false
      }
    ],
    orders: [], // 订单数组
    tabIndex: -1, // 默认导航栏索引
  },

  // 显示/隐藏订单数据
  toggle_order_detail(e){
    const order_number = e.currentTarget.dataset.order_number;  // 获取点击的index
    let order_list = this.data.orders;  // 显示数据
    let index = order_list.findIndex(v => v.order_number == order_number);
    order_list[index].show_order_detail = !order_list[index].show_order_detail
    this.setData({
      orders: order_list
    })
  },

  // 导航栏切换
  toggle(e){
    if (this.data.tabIndex !== e.detail) {
      let index = e.detail + 1;  // 导航栏索引
      console.log(index);
      
      this.getOrderDetail(index)
    }
    this.setData({
      tabIndex: e.detail
    })
  },

  onShow: function(){
    let pages = getCurrentPages();  // 获取页面栈
    let type = pages[pages.length - 1].options.type;  // 获取url参数
    let tabList = this.data.tabList
    tabList.forEach(item => {
      item.active = false
    });
    tabList[type - 1].active = true
    this.setData({
      tabList
    })
    const token = wx.getStorageSync('token')
    let header = {Authorization: token}
    // 判断是否有 token
    if (!token) {
      // 跳转页面
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
    this.getOrderDetail(type)
  },

  // 获取数据
  getOrderDetail(type){
    this.setData({
      orders: []  // 清空数组
    })
    const token = wx.getStorageSync('token')
    let header = {Authorization: token}
    request({
      url: '/my/orders/all',
      header,
      data:{
        type: type
      }
    }).then(res => {
      let arr = []
      for (const item of res.data.message.orders) {
        arr.push({
          consignee_addr: item.consignee_addr,  // 地址
          goods: item.goods,  // 商品数组
          order_number: item.order_number,  // 订单编号
          order_price: item.order_price,  // 订单总价
          total_count: item.total_count,  // 订单商品数量
          show_order_detail: false,  // 显示/隐藏订单数据
        })
      }
      this.setData({
        orders: arr
      })
    })
  }
})