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