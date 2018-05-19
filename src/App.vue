<template>
  <div id="app">
    <mt-search v-model="value"></mt-search>
    <router-view/>
    <mt-tabbar v-model="selected">
  <mt-tab-item id="首页">
    <img slot="icon" src="./assets/home.png">
    首页
  </mt-tab-item>
  <mt-tab-item id="购物车">
    <img slot="icon" src="./assets/car.png">
    购物车
  </mt-tab-item>
  <mt-tab-item id="消息">
    <img slot="icon" src="./assets/message.png">
    消息
  </mt-tab-item>
  <mt-tab-item id="发现">
    <img slot="icon" src="./assets/location.png">
    发现
  </mt-tab-item>
  <mt-tab-item id="我的">
    <img slot="icon" src="./assets/mine.png">
    我的
  </mt-tab-item>
</mt-tabbar>
  </div>
</template>

<script>
export default {
  data(){
    return {
      value:'',
      selected: false
    }
  }
}
</script>

<style type="text/less">
html,body{
  margin: 0;
  padding: 0;
 }
#app {
  .mt-search {
    height: 70px;
  }
}
</style>
