# 微云易购（微信小程序 / miniProgram） #

## 点击[查看项目 API 文档](https://www.showdoc.com.cn/128719739414963?page_id=2513235043485226) ##
### 微信搜索：微云易购，可以查看预览项目。（目前项目还在开发阶段，还未发布到微信小程序官网上 - 2020/11/22） ###

### 安装运行（安装运行前请确定已安装node环境）
* 环境安装：npm install
* 启动服务：npm run dev
* 发布代码：npm run build

### 目前以实现的功能
* 首页
* 搜索框
* 分类
* 分类菜单
* 分类切换
* 分类商品
* 商品列表
* 商品详情
* 收藏商品
* 商品大图显示
* 加入购物车
* 购物车单个数量增加/减少
* 购物车全选/反选

### 项目要点
#### 1、新建文件夹，分类文件。
* components 文件夹放的是组件
* request 文件夹放的是网络请求
* lib 文件夹放的是第三方库
* style 文件夹放的是公共样式
* utils 文件夹放的是自己的库

#### 2、管理字体图标
* 百度搜索阿里图标库，选中图标后加入购物车，在购物车中添加进项目中，点击 FontClass 生成代码，复制在 全局 wxss 文件中，通过类的引用就可以使用图标了

#### 3、初始化样式
* wxss 中是不支持通配符 * 来初始化样式的，所以只能通过手写标签来初始化样式
```css
page,view,text,image,swiper,swiper-item,navigator{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
```
定义 wxss 变量，管理项目颜色，在 页面文件 或者 组件文件中通过 var (变量名) 的方式来引用
```css
/* 定义wxss全局变量 */
page{
  --themeColor: #f8554d
}
```

#### 4、本地储存
* 在分类界面中由于 API 接口请求回来的数据较大。可以将请求回来的数据保存到本地当中，通过时间判断决定数据是否过期，重新发送请求或者使用本地旧数据
  * 在发送网络请求后，调用 wx API 方法将数据保存到本地
  * 通过 wx.setStorageSync( 'key', 'data' )，key 用于区分本地数据必须是唯一的
  * data 中定义两个变量 time，data。time 用于判断数据是否过期，data用于存放请求回来的数据内容
```js
request({
  url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'
}).then(res => {
  wx.setStorageSync('cates', {time: Date.now(), data: this.Cate})
})
```
  * 通过在页面的 onLoad 生命周期函数中决定是否发起请求或者使用本地数据
  * 调用 wx.getStorageSync('key') 获取第一次请求回来的数据内容，保存到变量 Cates 中
  * 判断 Cates 是否为空，如果为空则发送请求
  * 不为空的情况下，判断当前的时间戳距离上一次发送请求的时间戳是否大于 1000 * 300 (5分钟)，如果大于 5分钟 则重新发送请求，否则使用本地数据

#### 5、在全局中添加加载动画
* 调用 wx.showLoading () 方法使用加载动画，使用 wx.hideLoading() 隐藏动画。
* 可以在 request 网络请求方法中调用 动画，在 complete（不管请求发送成功或者失败都会执行） 函数中结束加载动画
```js
wx.showLoading({
    title: '加载中...',  // 文本内容
    mask: true  // 是否添加蒙版效果
})
wx.hideLoading()  // 隐藏加载动画
```

#### 6、购物车功能开发
* 进入页面后计算购物车商品总价 / 商品总数量，通过在 onShow 生命周期函数中去执行。
* 使用 forEach 去遍历缓存中的购物车数组，if 判断当 v (循环项) 的 checked 属性为 true 的时候，计算商品的总价格和总数量，当有一个商品的 checked 属性不为 true 的时候，则 isCheck (全选框) 改为 false
* forEach 不会对一个空数组进行遍历，所以在遍历后需要重新判断一下 购物车 数组的长度，并且设置 isCheck 为 false
```js
let totalPrice = 0;  // 总价格
let totalCount = 0;  // 总数量
let isCheck = true;  // 是否全选
// 遍历购物车数据
userGoodsDetail.forEach(v=>{
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
isCheck = userGoodsDetail.length !== 0?isCheck:false
this.setData({
  isCheck,
  totalPrice,
  totalCount
})
```

#### 7、微信支付功能
* 一、获取用户的基本参数，通过给 BUTTON 组件的 open-type 属性设置为 getUserInfo ，并且同时设置 bindgetuserinfo 的回调函数。在 回调函数中的 事件对象（e）获取基本参数。用户请求 token
```js
getUserInfo(e){
  // 获取用户参数
  const {encryptedData, rawData, iv, signature} = e.detail
}
```
* 二、当有了用户 token 的时候就可以开始创建订单进入预支付环节，通过 API 接口创建订单需要传入 总价格 / 地址 / 商品数据，并且将 token 设置为请求头（header）。创建完成订单后会生成订单编号，使用订单编号进行下一次请求。
```js
request({
  url: "/my/orders/create",
  data:{  // 请求参数
    order_price,  // 总价格
    consignee_addr,  // 地址
    goods  // 商品数据
  },
  header: header,  // 请求头 token
  method: "POST"  // 请求方式
}).then(res => { 
  console.log(res)
})
```
* 三、调用 API 接口（根据订单编号）获取需要支付时必备的几个参数。获取以下几个参数 nonceStr，package，paySign，timeStamp，signType
```js
request({
	url: "/my/orders/req_unifiedorder",
	method: "POST",
	header,
	data:{
 	 order_number
	}
}).then(res => {
  console.log(res)
})
```
* 四、调用微信官方内置的支付 API （wx.requestPayment），传入上一次获取的必备参数
```js
wx.requestPayment({
  nonceStr: 'nonceStr',
  package: 'package',
  paySign: 'paySign',
  timeStamp: 'timeStamp',
  signType: '',
  success: (result) => {
      console.log(result)
  },
  fail: (err) => {
      console.log(err)
  }
})
```