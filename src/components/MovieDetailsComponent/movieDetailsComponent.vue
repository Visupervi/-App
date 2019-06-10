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
      <h3>{{moveDetail.title+"简介："}}</h3>
      <div class="summaryContent">
        {{moveDetail.summary}}
      </div>
    </div>
    <div class="relativPhoto">
      <h3>{{moveDetail.title +"的图片："}}</h3>
      <ul>
        <li v-for="(item,index) in relativeArr" :key="index">
          <img :src="item.image" alt="">
        </li>
      </ul>
    </div>
    <div class="hotCommont">
      <h3>热门评论：</h3>
      <ul>

      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        id: this.$route.query.movieId,
        title: '',
        detailList: {},
        moveDetail: {},
        relativeArr: []
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
        this.axios.get('/api/movie/subject/' + this.id)
          .then(res => {
            this.moveDetail = res.data;
            this.title = res.data.title + " (" + res.data.year + ")";
            this.detailList.url = "https://images.weserv.nl/?url=" + res.data.images.medium.substring(8);
            temp = res.data.photos.slice(0, 5);
            for (let i = 0; i < temp.length; i++) {
              temp[i].image = "https://images.weserv.nl/?url=" + temp[i].image.substring(8);
            }
            this.relativeArr = temp;
            console.log(this.relativeArr);
            console.log(this.moveDetail);
          })
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
    h3{
      color:#007722;
      font-size: 16px;
      font-weight: 400;
    }
    margin-top: 70px;
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
            height: 110px;
          }
        }
      }
    }
    .hotCommont{

    }
  }
</style>

