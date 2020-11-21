
// 封装 request 请求
// params 参数必须是一个对象
export const request = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,  // 解构形参
      success: (result) => {
        resolve(result)  // 成功回调
      },
      fail: (res) => {
        reject(res)  // 失败回调
      },
    })
  })
}