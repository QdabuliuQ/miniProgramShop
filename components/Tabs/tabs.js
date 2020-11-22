// components/Tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,  // 导航栏活跃索引
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleTab(e){
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })
      this.triggerEvent('toggle', e.currentTarget.dataset.index)  // 事件传递
    }
  }
})
