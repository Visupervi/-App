<template>
  <div class="app">
    <mt-search v-model="value"></mt-search>
    <mt-navbar class="page-part" v-model="selected">
      <mt-tab-item id="top">Top 250</mt-tab-item>
      <mt-tab-item id="hot">正在热映</mt-tab-item>
      <mt-tab-item id="soon">即将上映</mt-tab-item>
    </mt-navbar>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in list" :key="index" :style="{ height: wrapperHeight + 'px' }">
        <img :src="item.images.medium">
      </mt-swipe-item>
    </mt-swipe>
    <h3>正在热映</h3>
    <div class="page-loadmore-wrapper" ref="wrapper">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"
                   @bottom-status-change="handleBottomChange">
        <div class="item" v-for="(item,index) in movieList" :key="index" @click="goToDetails(item.id)">
          <div class="name">
            <div class="movie-image">
              <img :src="item.images.medium" alt="">
            </div>
            <div class="movieTitle">
              《{{item.title}}》
            </div>
          </div>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }"></span>
          <span v-show="bottomStatus === 'loading'">Loading...</span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value:'',
        list: [],
        temp: [],
        movieList: [],
        bottomStatus: '',
        bottomDistance: '',
        wrapperHeight: 0,
        allLoaded: false,
        page: 1,
        count: 12,
        totalPage: '',
        selected:'hot'
      }
    },
    created() {
      this.getImage();
      this.getMovieList();
    },
    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },

      //轮播图
      getImage() {
        this.axios.get('/api/movie/in_theaters')
          .then(res => {
            for (let i = 0; i < 5; i++) {
              this.temp[i] = res.data.subjects[i];
              let _u = this.temp[i].images.medium.substring(8);
              this.temp[i].images.medium = 'https://images.weserv.nl/?url=' + _u;
            }
            this.list = this.temp;
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 上拉加载更多
      loadBottom() {
        this.$refs.loadmore.onBottomLoaded();
        this.getMovieList();
      },
      // 获取加载数据
      getMovieList() {
        this.axios.get('/api/movie/in_theaters?start=' + this.page + "&count=" + this.count)
          .then(res => {
            this.totalPage = Math.ceil(res.data.total / res.data.count);
            if (this.page > this.totalPage) {
              this.allLoaded = true;
            }
            let moveArr = [];
            moveArr = res.data.subjects;
            for (let i = 0; i < moveArr.length; i++) {
              let _u = moveArr[i].images.medium.substring(8);
              let castsTemp = [];
              let directorsTemp = [];
              if (moveArr[i].directors) {
                for (let j = 0; j < moveArr[i].directors.length; j++) {
                  directorsTemp[j] = moveArr[i].directors[j].name;
                }
              }
              if (moveArr[i].casts) {
                for (let j = 0; j < moveArr[i].casts.length; j++) {
                  castsTemp[j] = moveArr[i].casts[j].name;

                }
              }
              moveArr[i].directors = directorsTemp;
              moveArr[i].casts = castsTemp;
              moveArr[i].images.medium = 'https://images.weserv.nl/?url=' + _u;
            }
            this.movieList = this.movieList.concat(moveArr);
            this.page++
          }).catch(err => {
          console.log(err);
        })
      },
      //路由跳转
      goToDetails(id) {
        // id = JSON.stringify(id);
        this.$router.push({
          path: '/movieDetails',
          query: {movieId: id}
        })
      }
    },
    watch:{
      'selected':{
        handler(){
          if(this.selected ==="top"){
            this.$router.push({
              path:'/homeComponent'
            })
          }
          if(this.selected === 'hot'){
            this.$router.push({
              path:'/hotNow'
            })
          }
          if(this.selected === 'soon'){
            this.$router.push({
              path:'/commingSoon'
            })
          }
        }
      }
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
  }
</script>
<style lang='less' scoped>
  .page-loadmore-wrapper {
    overflow: scroll;
    .mint-loadmore-content {
      .item {
        margin-top: 10px;
        flex: 1;
        flex-direction: row;
        .name {
          .movie-image {
            box-sizing: border-box;
            height: 150px;
            padding: 0 5px;
            text-align: center;

            img {
              height: 100%;
              width: 115px;
            }
          }
          .movieTitle {
            font-size: 12px;
            text-align: center;
          }

        }
      }
    }
  }


  .mint-swipe {
    height: 230px;
    .mint-swipe-item img {
      width: 100%;
      height: 100%;
    }
  }


</style>
