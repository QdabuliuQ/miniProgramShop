

export const getTime = (time) => {
  let dateTime = new Date(time)
  let year = dateTime.getFullYear();  // 获取年份
  let mouth = dateTime.getMonth() + 1;  // 获取月份
  let day = dateTime.getDate();  // 获取日期
  return year + '-'+ mouth + '-' + day
}

// 微信登录
export const wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

// 微信支付
export const wxPay = (payParams) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...payParams,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}