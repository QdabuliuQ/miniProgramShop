import {request, showModal} from "../../request/request"
import {wxPay} from "../../utils/common"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAddressDetail: {},
    userGoodsDetail: [],
    isGetAddress: true,  // 是否获取地址信息
    totalPrice: 0, // 总价格
    totalCount: 0, // 商品总数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let address = wx.getStorageSync('address') || null
    if (address !== null) {
      this.setData({
        userAddressDetail: address,
        isGetAddress: false,
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userAddressDetail = wx.getStorageSync('address')  // 获取缓存中的地址数据
    let userGoodsDetail = wx.getStorageSync('cart')||[]  // 获取缓存中的购物车数据
    let checkedGoodsDetail = userGoodsDetail.filter(v => v.checked)
    this.setCartDetail(checkedGoodsDetail)
    this.setData({
      userAddressDetail,
      userGoodsDetail: checkedGoodsDetail
    })
  },
  // 获取收货地址
  getAddressBtn(){
    // 微信获取地址的时候出现的问题(在编译器中调试的问题)
    // 当用户获取地址的时候如果点击了取消，就也会自动取消小程序获取位置的权限
    //   并且用户下次点击获取地址的时候  wx.chooseAddress  会因为小程序无法获取到位置权限而获取不了

    // 在真机调试中不会出现以上情况
    wx.chooseAddress({
      success: (result) => {
        wx.setStorageSync('address', result)  // 将地址信息保存到缓存中
        this.setData({
          userAddressDetail: result,
          isGetAddress: false,  // 获取数据成功
        })
        wx.showToast({
          title: '获取成功',
          icon: 'success',
          mask: true
        })
      },
    })
  },

  // 计算购物车数据
  setCartDetail(cart){
    let totalPrice = 0;  // 总价格
    let totalCount = 0;  // 总数量
    let isCheck = true;  // 是否全选
    // 遍历购物车数据
    cart.forEach(v=>{
      // 价格 = 商品数量 * 商品单价
      totalPrice += v.num * v.goods_price
      totalCount += v.num
    })
    this.setData({
      totalPrice,
      totalCount
    })
  },

  // 支付按钮
  toPayment(){
    wx.showToast({
      title: '支付功能暂不开放',
      icon: 'none',
      mask: true
    })

    // const token = wx.getStorageSync('token')  // 获取 token
    // // 判断是否有 token
    // if (!token) {
    //   // 调用 navigateTo 跳转
    //   wx.navigateTo({
    //     url: '/pages/auth/index',
    //   })
    //   // return 结束
    //   return
    // }
    
    // // 如果有 token 发送请求创建订单
    // //const Authorization = token  // 请求头 token
    // const header = { Authorization: token }
    // const order_price = this.data.totalPrice  // 总价格
    // const consignee_addr =
    //  this.data.userAddressDetail.provinceName +
    //  this.data.userAddressDetail.cityName + 
    //  this.data.userAddressDetail.countyName + 
    //  this.data.userAddressDetail.detailInfo // 地址
    // let goods = []
    // this.data.userGoodsDetail.forEach(v => goods.push({
    //   goods_id: v.goods_id,
    //   goods_number: v.num,
    //   goods_price: v.goods_price
    // }))
    // // 创建订单
    // request({
    //   url: "/my/orders/create",
    //   data:{  // 请求参数
    //     order_price,  // 总价格
    //     consignee_addr,  // 地址
    //     goods  // 商品数据
    //   },
    //   header: header,  // 请求头 token
    //   method: "POST"  // 请求方式
    // }).then(res => {
    //   const order_number = res.data.message.order_number  // 订单编号
    //   // 获取支付参数  调用微信支付时需要的支付参数
    //   request({
    //     url: "/my/orders/req_unifiedorder",
    //     method: "POST",
    //     header,
    //     data:{
    //       order_number
    //     }
    //   }).then(res => {
    //     // 保存请求参数
    //     const pay = res.data.message.pay;
    //     // 调用封装的微信支付方法
    //     // wxPay(pay).then(res => {
    //     //   // console.log(res);
    //     // })
    //   })
    // })
    
  }
})