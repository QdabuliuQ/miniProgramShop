import {request} from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    goods_list: [],
    clearBtn: true  // 显示/隐藏清除按钮
  },
  TimeId: -1,  // 存放定时器
  // 输入框事件
  searchInput(e){
    let str = e.detail.value
    // trim方法会去除字符串前后的空格
    // 判断输入的值是否合法
    clearInterval(this.TimeId)  // 清除上一次的延时器
    if (!str.trim()) {
      this.setData({
        goods_list: [],
        clearBtn: true
      })
      return  // 不合法 直接return
    } 
    this.setData({
      clearBtn: false
    })
    this.TimeId = setTimeout(() => {  // 重新创建新的延时器 （防抖）
      this.getGoodsDetail(str)
    }, 1000)
  },

  // 获取数据
  getGoodsDetail(query){
    request({
      url: "/goods/qsearch",
      data: {
        query
      }
    }).then(res => {
      this.setData({
        goods_list: res.data.message
      })
    })
  },

  // 清空文本事件
  clear_search_text(){
    this.setData({
      value: "",  // 清空文本框内容
      goods_list: [],  // 清空商品数组
      clearBtn: true  // 隐藏按钮
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
})