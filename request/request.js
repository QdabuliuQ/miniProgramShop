
// 封装 request 请求
// params 参数必须是一个对象
let ajaxTime = 0;  // 用于计算请求次数
export const request = (params) => {
  ajaxTime++;  // 索引++
  wx.showLoading({
    title: '加载中...',  // 文本内容
    mask: true  // 是否添加蒙版效果
  })
  const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'  // 请求根路径
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,  // 解构形参
      url: baseURL + params.url,  // 路径拼接
      success: (result) => {
        resolve(result)  // 成功回调
      },
      fail: (res) => {
        reject(res)  // 失败回调
      },
      // complete 函数 表示不管异步请求成功或者失败都会执行
      complete: () => {
        ajaxTime --;
        if (ajaxTime === 0) {
          wx.hideLoading()  // 隐藏加载动画
        }
      }
    })
  })
}