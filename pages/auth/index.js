import { wxLogin } from "../../utils/common.js"
import { request } from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: null
  },

  // 获取用户信息
  getUserInfo(e){
    let userInfo = e.detail.userInfo  // 获取用户信息
    wx.setStorageSync('userinfo', userInfo)  // 保存到缓存
    wx.navigateBack({  // 返回上一个页面
      delta: 1,
    })
    // // 获取用户参数
    // const {encryptedData, rawData, iv, signature} = e.detail
    // // 微信登录授权
    // wx.login({
    //   timeout: 10000,
    //   success: (result) => {
    //     const code = result.code
    //     // 发起请求
    //     request({
    //       url: "/users/wxlogin",
    //       data: {
    //         encryptedData,
    //         rawData, 
    //         iv, 
    //         signature,
    //         code
    //       },
    //       method: "post"
    //     }).then(res => {
    //       console.log(res);
    //     })
    //   }
    // })
    // const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    // wx.setStorageSync('token', token)  // 保存到缓存
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})