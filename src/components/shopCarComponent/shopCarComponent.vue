<template>
  <div class="app">
    <p>购物车</p>
    <ul>
      <li v-for="(item,index) in goodsList" :key="index">
        <label class="mint-checklist">
        <span class="mint-checkbox" id="mint-checkbox">
          <input type="checkbox" class="mint-checkbox-input" v-model="checkboxModel" :value="item">
          <span class="mint-checkbox-core"></span>
        </span>
          <span class="mint-checkbox-label">
        </span>
        </label>
        <div class="carImg" v-if="item.data.images !=undefined">
          <img :src="'https://images.weserv.nl/?url='+item.data.images.medium">
        </div>
        <div class="carText">
          <div class="carTexTitle" v-if="item.data.title !=undefined">{{item.data.title}}</div>
          <div class="cartDes">{{item.data.summary.substring(0,20)+"..."}}</div>
          <div class="goodsNum">
            <h5>￥：{{2333*item.count}}
              <div class="btnWrap">
                <button class="add" @click="addCount(item)">+</button>
                <input type="text" v-model="item.count" @change="countChange">
                <button class="del" @click="delCount(item)">-</button>
              </div>
            </h5>
          </div>
        </div>
      </li>
    </ul>
    <div class="total">
      <label class="mint-checklist">
        <span class="mint-checkbox" id="">
          <input type="checkbox" class="mint-checkbox-input" value="" @click="checkedAll" v-model="checked">
          <span class="mint-checkbox-core"></span>
        </span>
        <span class="mint-checkbox-label">
          全选
        </span>
        <span class="comTotal">
          合计:￥{{allCount}}
        </span>
      </label>
      <button @click="pay">结算</button>
    </div>
  </div>
</template>
<script>
  export default {
    props: [],
    data() {
      return {
        goodsList: [],
        count: "",
        checkboxModel: [],
        checked: false,
        allCount: 0
      }
    },
    methods: {
      getGoodsList() {
        let dataArr = this.$store.state.car.map(item => {
          return item
        });
        this.goodsList = dataArr;
      },
      //点击加号，同不vuex
      addCount(item) {
        item.count++;
        this.$store.state.car.some((ele, i, arr) => {
          if (item.id === ele.id) {
            ele.count = item.count;
          }
        });
        this.$store.commit("addToShopCar", item);
      },
      //点击-号，当为1就删除
      delCount(item) {
        if (item.count > 1) {
          item.count--;
          this.$store.commit("addToShopCar", item);
        } else {
          this.$store.commit("delGoodsById", item.id);
          this.goodsList.some((ele, i) => {
            if (item.id === ele.id) {
              this.goodsList.splice(i, 1);
            }
          })
        }
      },
      countChange() {
      },
      checkedAll() {
        if (this.checked) {
          this.checkboxModel = [];
        } else {
          this.checkboxModel = [];
          this.goodsList.forEach(item => {
            this.checkboxModel.push(item);
          })
        }
      },
      pay() {
        alert("暂时没办法结算");
      }
    },
    created() {
      this.getGoodsList();
    },
    watch: {
      'checkboxModel': {
        handler() {
          this.allCount = 0;
          if (this.checkboxModel.length !== this.goodsList.length) {
            this.checked = false;
          } else {
            this.checked = true;
          }
          this.checkboxModel.forEach((item, index) => {
            this.allCount += item.count * 2333;
          })
        },
        deep: true
      },
    }
  }
</script>
<style lang="less" scoped>
  .app {
    margin-top: 40px;
    height: 100%;

    ul {
      list-style: none;
      margin: 0px;
      padding: 0px;
      padding: 0 10px;

      li {
        display: flex;
        margin-top: 10px;
        background-color: #eee;
        border-radius: 8px;

        .carImg {
          flex: 1;
          /*width: 50px;*/
          height: 78.9px;
          border: 1px solid #ccc;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .mint-checklist {
          .mint-checkbox {
            .mint-checkbox-core {
              width: 15px;
              height: 15px;
              top: 50%;
              left: 5px;
              -webkit-transform: translate(0, 50%);
              -moz-transform: translate(0, 50%);
              -ms-transform: translate(0, -50%);
              -o-transform: translate(0, -50%);
              transform: translate(0, -50%);
            }

            .mint-checkbox-core:after {
              top: 1px;
              left: 4px;
            }
          }
        }

        .carText {
          flex: 4;
          padding-left: 10px;
          box-sizing: border-box;
          font-size: 14px;

          h5 {
            padding: 0;
            margin: 0;
            font-size: 14px;
            font-weight: 400;
            position: relative;

            .btnWrap {
              margin-bottom: 5px;
              position: absolute;
              bottom: -7px;
              right: 10px;

              input {
                width: 30px;
                text-align: center;
                outline-style: none;
                vertical-align: middle;
                border: 1px solid #ccc;
                padding: 2px;
              }

              button {
                outline-style: none;
                border: 1px solid #ccc;
                width: 30px;
                padding: 2px;
                background-color: #fff;
                position: relative;
                vertical-align: middle;
              }

              .add {
                border-right: 0;
                left: 4px;
              }

              .del {
                border-left: 0;
                right: 4px;
              }
            }
          }
        }
      }
    }

    .total {
      position: fixed;
      z-index: 9999;
      background-color: #fff;
      bottom: 60px;
      border-top: 1px solid #efefef;
      width: 100%;
      height: 50px;
      padding: 0 10px;
      box-sizing: border-box;

      .mint-checklist {
        .mint-checkbox {
          font-size: 12px;

          .mint-checkbox-core {
            width: 15px;
            height: 15px;
            position: absolute;
            top: 50%;
            left: 15px;
            -webkit-transform: translate(0, 50%);
            -moz-transform: translate(0, 50%);
            -ms-transform: translate(0, -50%);
            -o-transform: translate(0, -50%);
            transform: translate(0, -50%);
          }

          .mint-checkbox-core:after {
            top: 1px;
            left: 4px;
          }
        }

        .mint-checkbox-label {
          font-size: 12px;
          top: 50%;
          position: absolute;
          left: 30px;
          -webkit-transform: translate(0, 50%);
          -moz-transform: translate(0, 50%);
          -ms-transform: translate(0, -50%);
          -o-transform: translate(0, -50%);
          transform: translate(0, -50%);
        }

        .comTotal {
          position: absolute;
          font-size: 12px;
          top: 50%;
          -webkit-transform: translate(0, 50%);
          -moz-transform: translate(0, 50%);
          -ms-transform: translate(0, -50%);
          -o-transform: translate(0, -50%);
          transform: translate(0, -50%);
          right: 90px;
        }
      }

      button {
        background-image: linear-gradient(90deg, #FF9000 0%, #FF5000 98%);
        outline-style: none;
        border: none;
        font-size: 15px;
        padding: 5px 20px;
        border-radius: 15px;
        color: #fff;
        position: absolute;
        right: 10px;
        top: 50%;
        -webkit-transform: translate(0, 50%);
        -moz-transform: translate(0, 50%);
        -ms-transform: translate(0, -50%);
        -o-transform: translate(0, -50%);
        transform: translate(0, -50%);
      }
    }
  }
</style>
