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
  priviewImgList: [],  // 定义全局变量  存放大图预览数组
  GoodsDetail: 0,  // 商品i
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goods_id: options.goods_id  // 保存id
    })
    this.getGoodsDetail()
  },

  // 商品信息
  getGoodsDetail(){
    request({
      url:"/goods/detail",
      data: {
        goods_id: this.data.goods_id
      }
    }).then(res => {
      // map 方法遍历出符合要求的内容
      this.priviewImgList = res.data.message.pics.map( v => v.pics_mid)
      this.GoodsDetail = res.data.message  // 保存商品信息
      let collect = wx.getStorageSync('collect')||[]  // 获取缓存中的收藏数组
      let isCollect = collect.some(v => v.goods_id === this.GoodsDetail.goods_id)  // some方法当回调函数中有一个为true 整个some函数的返回值就 true
      this.setData({
        name: res.data.message.goods_name,
        price: res.data.message.goods_price,
        goods_number: res.data.message.goods_number,
        pics: res.data.message.pics,
        // iphone 部分手机不支持 webp 图片格式
        // 将 webp 修改为 jpg
        goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, '.jpg'), 
        attrs: res.data.message.attrs,
        isCates: isCollect
      })
      
      // 添加浏览记录
      let browseList = wx.getStorageSync('browse')||[]  // 获取浏览记录
      // findIndex方法如果没有获取到匹配的条件则返回-1
      let index = browseList.findIndex(v => v.goods_id === this.data.goods_id)  
      // 判断index是否为 -1  如果为-1表示没有之前没有浏览过该商品
      // 向数组中添加商品
      if (index === -1) {
        browseList.push({
          goods_id: this.data.goods_id,
          goods_name: this.data.name,
          goods_price: this.data.price, 
          goods_number: this.data.goods_number,
          goods_small_logo: res.data.message.goods_small_logo
        })
        wx.setStorageSync('browse', browseList)
      }
    })
  },

  // 收藏按钮
  toggleCategory(){
    let isCates = this.data.isCates;  // 获取当前的isCates
    let collectList = wx.getStorageSync('collect')||[]
    if (!isCates) {
      collectList.push({
        goods_name: this.GoodsDetail.goods_name,
        goods_price: this.GoodsDetail.goods_price,
        goods_number: this.GoodsDetail.goods_number,
        goods_small_logo: this.GoodsDetail.goods_small_logo,
        goods_id: this.GoodsDetail.goods_id
      })
      wx.setStorageSync('collect', collectList)
    } else {
      let index = collectList.findIndex(v => v.goods_id === this.GoodsDetail.goods_id)
      collectList.splice(index, 1) // 删除商品
      wx.setStorageSync('collect', collectList)  // 重新设置缓存
    }
    this.setData({
      isCates: !this.data.isCates
    })
  },

  // 大图预览
  previewImg(e){
    let index = e.currentTarget.dataset.index;  // 保存点击索引
    // 调用 wx.previewImage 方法 大图查看
    // urls: 保存的图片数组
    // current: 当点击图片显示对应的图片路径
    wx.previewImage({
      urls: this.priviewImgList,
      current: this.priviewImgList[index],
    })
  },

  // 加入购物车
  addCart(){
    // 将数据放入缓存中
    let cart = wx.getStorageSync('cart') || [] // 获取缓存中的内容 如果没有缓存则创建一个空数组
      // findIndex 查找数组 cart 中是否已经有当前的商品
      // 如果有返回 cart 中的索引
      // 没有返回 -1
    let index = cart.findIndex(v => v.goods_id === this.GoodsDetail.goods_id)
    // 如果 缓存 中没有当前商品
    if (index===-1) {
      this.GoodsDetail.num = 1  // 创建num属性赋值为 1
      this.GoodsDetail.checked = true  // 商品在购物车中是未选中状态
      cart.push(this.GoodsDetail)  // 添加进数组 cart 中
    // 如果缓存中已经有该商品了
    // 只需要数量 + 1
    } else {
      cart[index].num ++  // 拿到缓存中对应的元素的 num 值 +1
    }
    // setStorageSync 重新添加进缓存中
    wx.setStorageSync('cart', cart)
    // 提示信息
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  }
})