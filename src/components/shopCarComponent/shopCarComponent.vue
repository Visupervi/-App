<template>
  <div class="app">
    <p>我是购物车啊</p>

  <ul>
    <li>
      <div class="carImg">

      </div>
      <div class="carText">
        <div class="carTexTitle">sssssssssssssshjhjhjhjhjhjhjhjhjhjhjhj</div>
        <div class="cartDes">sdsdsdsdsdsdsdsdsdsds</div>
        <div class="goodsNum">
          <h5>￥：<button class="add">+</button><input type="text" v-model="value"><button class="del">-</button></h5>
        </div>
      </div>
    </li>
  </ul>
  </div>
</template>
<script >
  export default {
    data(){
      return{
        value:'123'
      }
    },
    methods:{},
    created() {
    }
  }
</script>

<style lang="less" scoped>
.app{
  padding: 0 10px;
  margin-top: 60px;
  ul{
    list-style: none;
    margin: 0px;
    padding: 0px;
    li{
      display: flex;
      .carImg{
        flex: 1;
        /*width: 50px;*/
        height: 70px;
        border: 1px solid #ccc;
      }
      .carText{
        flex: 4;
        padding-left: 10px;
        box-sizing: border-box;
        h5{
          padding: 0;
          margin: 0;
          font-size: 14px;
          font-weight: 400;
          input{
            width: 30px;
            text-align: center;
          }
          button{
            outline-style: none;
            border: 1px solid #ccc;
            width: 30px;
            padding: 2px;
            background-color: #fff;
          }
          .add{
            border-right: 0;
          }
          .del{
            border-left: 0;
          }
        }
      }
    }
  }

}
</style>
