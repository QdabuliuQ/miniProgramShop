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
      let tabList = this.data.tabList
      tabList.forEach(item => {
        item.active = false
      });
      
      tabList[e.currentTarget.dataset.index].active = true
      this.setData({
        tabList
      })
      this.triggerEvent('toggle', e.currentTarget.dataset.index)  // 事件传递
    }
  }
})
