import {request} from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id: 0,
    name: '',  // 标题
    price: '',  // 价格
    goods_number: '', // 库存
    goods_introduce: '',  // 商品描述
    pics: '',  // 商品轮播图
    attrs: '',  // 商品属性
    isCates: false,  // 是否收藏商品
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goods_id: options.goods_id  // 保存id
    })

    this.getGoodsDetail()
  },

  getGoodsDetail(){
    request({
      url:"/goods/detail",
      data: {
        goods_id: this.data.goods_id
      }
    }).then(res => {
      console.log(res);
      this.setData({
        name: res.data.message.goods_name,
        price: res.data.message.goods_price,
        goods_number: res.data.message.goods_number,
        pics: res.data.message.pics,
        goods_introduce: res.data.message.goods_introduce,
        attrs: res.data.message.attrs,
      })
    })
  },

  // 收藏按钮
  toggleCategory(){
    this.setData({
      isCates: !this.data.isCates
    })
  }
})