<template>
  <div id="app">
    <div class="title">豆瓣电影</div>
    <router-view/>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="homeComponent">
        <img slot="icon" src="./assets/home.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="shopCar">
        <img slot="icon" src="./assets/car.png">
        购物车
      </mt-tab-item>
      <mt-tab-item id="消息">
        <img slot="icon" src="./assets/message.png">
        消息
      </mt-tab-item>
      <mt-tab-item id="find">
        <img slot="icon" src="./assets/location.png">
        发现
      </mt-tab-item>
      <mt-tab-item id="mine">
        <img slot="icon" src="./assets/mine.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: '',
      }
    },
    created() {
    },
    methods: {},
    watch: {
      'selected': {
        handler() {
          switch (this.selected) {
            case "homeComponent":
              this.$router.push(
                {
                  path: '/'
                });
              break;
            case "shopCar":
              this.$router.push(
                {
                  path: '/shopCar'
                });
              break;
            case "find":
              this.$router.push(
                {
                  path: '/find'
                });
              break;
          }
        }
      },
      '$route'(to) {
        if (to.path.indexOf("movieDetails") == -1) {
          this.selected = "";
        }
      }
    }
  }
</script>

<style lang="less">
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #app {
    height: inherit;

    .title {
      text-align: center;
      height: 30px;
      line-height: 30px;
      color: #fff;
      display: flex;
      background-color: #0f8884;
      position: fixed;
      top: 0;
      font-size: 18px;
      width: 100%;
      z-index: 9999;
    }

    .mint-search {
      height: 55px;
      width: 100%;
      position: fixed;
      top: 30px;
      z-index: 9999;

      .mint-searchbar {
        background-color: #ccc;
        padding: 1px;
      }
    }

    .mint-navbar {
      margin-top: 70px;
      background-color: #eee;

      .mint-tab-item {
        padding: 10px 0;

        .mint-tab-item-label {
          font-size: 16px;
        }
      }
    }

    .mint-tabbar {
      position: fixed;
      bottom: 0;
      width: 100%;
    }
  }

</style>
