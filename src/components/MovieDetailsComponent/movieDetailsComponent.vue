<template>
  <div class="app">
    <h2 class="movieName" v-html="title"></h2>
    <div class="detail">
      <div class="image">
        <img :src="detailList.url" alt="">
      </div>
      <div class="description">
        <ul>
          <li v-if="moveDetail.directors != undefined"><span>导演：</span>{{moveDetail.directors |
            commonFilter(moveDetail.directors)}}
          </li>
          <li v-if="moveDetail.writers != undefined"><span>编剧：</span>{{ moveDetail.writers |
            commonFilter(moveDetail.writers)}}
          </li>
          <li v-if="moveDetail.casts != undefined"><span>主演：</span>{{moveDetail.casts | commonFilter(moveDetail.casts)}}
          </li>
          <li v-if="moveDetail.genres != undefined"><span>类型：</span>{{moveDetail.genres.join("，")}}</li>
          <li v-if="moveDetail.countries != undefined"><span>制片国家/地区：</span>{{moveDetail.countries.join(" / ")}}</li>
          <li v-if="moveDetail.languages != undefined"><span>语言：</span>{{moveDetail.languages.join("，")}}</li>
          <li><span>上映日期：</span>{{moveDetail.pubdate}}</li>
          <li v-if="moveDetail.durations != undefined"><span>片长：</span>{{moveDetail.durations.join("/")}}</li>
          <li v-if="moveDetail.aka != undefined"><span>又名：</span>{{moveDetail.aka.join(" / ")}}</li>
        </ul>
      </div>
    </div>
    <div class="summary">
      <h3 v-if="moveDetail.title !=undefined">{{moveDetail.title+"简介："}}</h3>
      <div class="summaryContent">
        {{moveDetail.summary}}
      </div>
    </div>
    <div class="relativPhoto">
      <h3 v-if="moveDetail.title != undefined">{{moveDetail.title +"的图片："}}</h3>
      <ul>
        <li v-for="(item,index) in relativeArr" :key="index">
          <img :src="item.image" alt="">
        </li>
      </ul>
    </div>
    <div class="hotCommont">
      <h3 v-if="commontArr !== undefined">热门评论：</h3>
      <ul>
        <li class="commontWrap" v-for="(item,index) in commontArr" :key="index">
          <div class="header">
            <div class="avatar">
              <img :src="item.author.avatar" alt="">
            </div>
            <div class="name">{{item.author.name}}</div>
          </div>
          <div class="content">
            <p>{{item.content}}</p>
            <div class="time">
              <p>{{item.created_at}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="button">
      <div class="buttonWrap" v-if="moveDetail !== undefined">
        <mt-button size="normal" type="danger" @click="addToShopCart">加入购物车</mt-button>
        <mt-button size="normal" type="danger" @click="immedBuy">立即购买</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {getSubject} from "../../api";
  export default {
    data() {
      return {
        id: this.$route.query.movieId,
        title: '',
        detailList: {},
        moveDetail: {},
        relativeArr: [],
        commontArr: [],
        isShow: false,
        goodsCount: 1
      }
    },
    mounted() {
    },
    created() {
      this.$nextTick(() => {
        this.getMovieList();
      })
    },
    methods: {
      getMovieList() {
        let temp = [];
        let tempCom = [];
        getSubject(this.id).then((res)=>{
          console.log("getSubject");
          console.log(res);
          this.moveDetail = res;
          this.title = res.title + " (" + res.data.year + ")";
          this.detailList.url = "https://images.weserv.nl/?url=" + res.images.medium.substring(8);
          temp = res.photos.slice(0, 5);
          tempCom = res.popular_comments;
          for (let i = 0; i < temp.length; i++) {
            temp[i].image = "https://images.weserv.nl/?url=" + temp[i].image.substring(8);
          }
          for (let j = 0; j < tempCom.length; j++) {
            tempCom[j].author.avatar = "https://images.weserv.nl/?url=" + res.popular_comments[j].author.avatar.substring(8)
          }
          this.commontArr = tempCom;
          this.relativeArr = temp;
        });
        // this.axios.get('/api/movie/subject/' + this.id)
        //   .then(res => {
        //     this.moveDetail = res.data;
        //     this.title = res.data.title + " (" + res.data.year + ")";
        //     this.detailList.url = "https://images.weserv.nl/?url=" + res.data.images.medium.substring(8);
        //     temp = res.data.photos.slice(0, 5);
        //     tempCom = res.data.popular_comments;
        //     for (let i = 0; i < temp.length; i++) {
        //       temp[i].image = "https://images.weserv.nl/?url=" + temp[i].image.substring(8);
        //     }
        //     for (let j = 0; j < tempCom.length; j++) {
        //       tempCom[j].author.avatar = "https://images.weserv.nl/?url=" + res.data.popular_comments[j].author.avatar.substring(8)
        //     }
        //     this.commontArr = tempCom;
        //     this.relativeArr = temp;
        //   })
      },
      addToShopCart() {
        this.isShow = !this.isShow;
        this.$store.commit("addToShopCar", {id: this.id, count: this.goodsCount, data: this.moveDetail});
      },
      //立即购买，添加并跳转到购物车
      immedBuy() {
        this.isShow = !this.isShow;
        this.$store.commit("addToShopCar", {id: this.id, count: this.goodsCount, data: this.moveDetail});
        this.$router.push({
          path: '/shopCar'
        });
      },
      clearRouter() {
        if (this.$route.query.movieId) {
          console.log("触发函数");
          this.selected = "";
        }
      },
    },
    filters: {
      commonFilter(obj) {
        let str = [];
        for (let i = 0; i < obj.length; i++) {
          str.push(obj[i].name);
        }
        return str.join("，");
      }
    }
  }
</script>
<style lang="less" scoped>
  .app {
    h3 {
      color: #007722;
      font-size: 16px;
      font-weight: 400;
    }

    margin-top: 30px;
    padding: 0px 5px;
    overflow: scroll;
    padding-bottom: 60px;

    h2 {
      font-size: 16px;
    }

    .detail {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;

      .image {
        flex: 1;

        img {
          width: 90%;
        }
      }

      .description {
        flex: 1;

        ul {
          padding: 0px;
          margin: 0px;
          font-size: 13px;

          li {
            list-style: none;
            padding: 0px;
            margin: 0px;
            color: #37a;
            margin-bottom: 5px;

            span {
              color: #000;
            }
          }
        }
      }

    }

    .summary {
      .summaryContent {
        text-indent: 2rem;
        font-size: 14px;
      }
    }

    .relativPhoto {
      ul {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        margin: 0px;
        padding: 0px;

        li {
          list-style: none;
          flex: 1;

          img {
            width: 96%;
            height: 105px;
          }
        }
      }
    }

    .hotCommont {
      ul {
        margin: 0px;
        padding: 0px;

        li {
          list-style: none;
          position: relative;

          .header {
            position: relative;

            .avatar {
              width: 40px;
              height: 40px;
              box-sizing: border-box;
              border-radius: 50%;
              border: 1px solid #ccc;
              overflow: hidden;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .name {
              position: absolute;
              font-size: 12px;
              top: 5px;
              left: 50px;
            }
          }

          .content {
            position: relative;
            top: -15px;
            left: 50px;

            p {
              word-wrap: break-word;
              word-break: break-all;
              width: 87%;
              margin: 0px;
              padding: 0px;
              font-size: 14px;
            }

            .time {
              position: relative;
              bottom: -5px;
              left: 0px;

              p {
                font-size: 12px;
              }
            }
          }
        }
      }
    }

    .button {
      height: 50px;
      position: relative;
      .buttonWrap {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);

        .mint-button--normal {
          font-size: 12px;
          width: 49%;
          padding: 0px;
          height:35px;
        }

      }
    }

  }
</style>

