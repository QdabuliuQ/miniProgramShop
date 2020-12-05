// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        text: "体验问题",
        active: true
      },
      {
        text: "商品/商家投诉",
        active: false
      }
    ],
    feedback_tip_list:[
      {
        text: '功能建议',
        active: true
      },
      {
        text: '购买问题',
        active: false
      },
      {
        text: '小程序性能问题',
        active: false
      },
      {
        text: '界面加载慢',
        active: false
      },
      {
        text: '其他',
        active: false
      },
    ],
    textareaValue: "",  // 输入框内容
    upImageList: [],  // 上传图片数组
    textarea: "",  // 文本域内容
  },
  UpImageList: [],  // 上传图床的链接数组
  // 点击按钮上传图片
  // 调用微信内置的api方法进入相册
  // 该api将图片路径保存到数组中
  addImage(){
    wx.chooseImage({
      count: 9,  // 最多上传数量
      sizeType: ['original', 'compressed'],  // 图片格式：原图/压缩
      sourceType: ['album', 'camera'],  // 来源：相册/照相机
      success: (result) => {  // 成功回调
        this.setData({
          // 如果直接对 upImageList 进行赋值的话会覆盖上一次上传的图片
          // 通过解构原来的数组 + 当前重新上传的数组 进行拼接
          upImageList: [...this.data.upImageList, ...result.tempFilePaths]
        })
      }
    })
  },

  // 长按删除图片
  handleLongPress(e){
    let imageList = this.data.upImageList
    let index = e.currentTarget.dataset.index
    imageList.splice(index, 1)
    this.setData({
      upImageList: imageList
    })
  },

  // 获取文本框内容
  textInput(e){
    this.setData({
      textarea: e.detail.value  // 保存文本内容
    })    
  },
  
  // 问题种类按钮
  toggleFeedbackTip(e){
    const index = e.currentTarget.dataset.index
    let tipList = this.data.feedback_tip_list
    tipList[index].active = !tipList[index].active
    this.setData({
      feedback_tip_list: tipList
    })
  },

  // 提交按钮
  submitText(){
    const text = this.data.textarea
    const upImageList = this.data.upImageList
    if (!text.trim()) {
      // 判断是否合法
      wx.showToast({
        title: '输入不合法',
        icon:'none',
        mask: true
      })
      return  // 不执行下面的代码
    }
    if (upImageList.length !== 0) {
      // 上传图片
      // 由于上传api只能一次上传一次 所以使用循环来上传
      upImageList.forEach((v, i) => {
        console.log(v);
        
        wx.uploadFile({
          filePath: v,  // 上传的文件路径
          name: 'image',  // 文件名称
          url: 'https://img.coolcr.cn/api/upload',  // 上传的目标地址
          success: (result) => {
            // 请求回来的是 json 类型数据  将json解析为对象并保存
            let url = JSON.parse(result.data).data.url
            this.UpImageList.push(url)  // 添加到数组
            // 判断是否全部上传完成
            if (i === upImageList.length - 1) {
              wx.showToast({
                title: '提交成功！',
                icon: 'success',
                mask: true
              })
              // 重置数据
              this.setData({
                textareaValue: "",  // 输入框内容清空
                upImageList: [],  // 图片数组清空
              })
            }
          }
        })
      })
    } else {
      wx.showToast({
        title: '提交成功！',
        icon: 'success',
        mask: true
      })
      // 重置数据
      this.setData({
        textareaValue: "",  // 输入框内容清空
        upImageList: [],  // 图片数组清空
      })
    }
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