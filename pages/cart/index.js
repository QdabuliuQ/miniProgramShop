import {showModal} from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCheck: false,
    userAddressDetail: {},  // 用户地址信息数据
    isGetAddress: true,  // 是否获取地址信息
    userGoodsDetail: [],  // 用户购物车数据
    totalPrice: 0,  // 商品总价
    totalCount: 0,  // 商品总数量
  },

  // 是否全选商品
  toggleCheck(){
    this.data.isCheck = !this.data.isCheck
    const isCheck = this.data.isCheck
    let cart = this.data.userGoodsDetail
    for (const item of cart) {
      item.checked = isCheck
    }
    this.setData({
      userGoodsDetail: cart,
      isCheck
    })
    wx.setStorageSync('cart', cart)
    this.setCartDetail(cart)
  },

  // 获取收货地址
  getAddressBtn(){
    // 微信获取地址的时候出现的问题(在编译器中调试的问题)
    // 当用户获取地址的时候如果点击了取消，就也会自动取消小程序获取位置的权限
    //   并且用户下次点击获取地址的时候  wx.chooseAddress  会因为小程序无法获取到位置权限而获取不了

    // 在真机调试中不会出现以上情况
    wx.chooseAddress({
      success: (result) => {
        console.log(result);
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

  // 是否选中商品
  isCheckGoods(e){
    const goods_id = e.currentTarget.dataset.id
    let cart = this.data.userGoodsDetail;  // 获取data中的购物车数据
    const index = cart.findIndex(v => v.goods_id === goods_id)  // findIndex 查找出对应 索引
    cart[index].checked = !cart[index].checked;  // 进行取反
    this.setData({
      userGoodsDetail: cart  // 修改 data 中的数据
    })
    this.setCartDetail(cart)
  },

  // 页面显示生命周期函数
  onShow(){   
    const userAddressDetail = wx.getStorageSync('address')||null  // 获取缓存中的地址数据
    if (userAddressDetail !== null) {
      this.setData({
        isGetAddress: false
      })
    }
    const userGoodsDetail = wx.getStorageSync('cart')||[]  // 获取缓存中的购物车数据
    this.setData({
      userAddressDetail,
      userGoodsDetail
    })
    // every 数组方法用于遍历数组，当every中的回调函数的返回值全部为 true 的时候every方法的返回值才会是 true
    // 当 every 遍历的是一个空数组的时候，方法的返回值也是 true
    // const isCheck = userGoodsDetail.length?userGoodsDetail.every( v => v.checked ):false
    this.setCartDetail(userGoodsDetail)
  },

  // 计算购物车数据
  setCartDetail(cart){
    let totalPrice = 0;  // 总价格
    let totalCount = 0;  // 总数量
    let isCheck = true;  // 是否全选
    // 遍历购物车数据
    cart.forEach(v=>{
      // 当商品被选中后
      if (v.checked) {
        // 价格 = 商品数量 * 商品单价
        totalPrice += v.num * v.goods_price
        totalCount += v.num
      } else {
        isCheck = false  // 当发现一个商品未选中则 不全选
      }
    })
    // forEach 如果遍历的是一个空数组的话，则不会进行遍历
    // 重新判断一下购物车数组
    isCheck = cart.length !== 0?isCheck:false
    this.setData({
      isCheck,
      totalPrice,
      totalCount
    })
    wx.setStorageSync('cart', cart)
  },

  // 设置商品数量
  goodsCountSet(e){
    const goods_id = e.currentTarget.dataset.id;
    const goods_num = e.currentTarget.dataset.operation;
    let cart = this.data.userGoodsDetail;
    let index = cart.findIndex(v => v.goods_id === goods_id);  // 获取对应的商品索引
    if (cart[index].num === 1 && goods_num === -1) {
      showModal({content: '是否删除该商品？'}).then(res => {
        cart.splice(index, 1)
        this.setData({
          userGoodsDetail: cart
        })
        wx.setStorageSync('cart', cart)
      })
    } else {
      cart[index].num += goods_num  // 修改数量
      this.setData({
        userGoodsDetail: cart  // 修改 data 中的数据
      })
      wx.setStorageSync('cart', cart)
      this.setCartDetail(cart)
    }
  }
})