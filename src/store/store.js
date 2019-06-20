import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
let goods = JSON.parse(localStorage.getItem('goods') || '[]');
const store = new Vuex.Store({
  state(){
    return{
      car:goods
    }
  },
  mutations:{
    addToShopCar(state,goods){
      let flag = false;
      state.car.some(item =>{
        if(item.id === goods.id){
          item.count = goods.count;
          flag = true;
          return flag;
        }
      });
      if(!flag){
        state.car.push(goods);
      }
      localStorage.setItem('goods',JSON.stringify(state.car))
    },
    delGoodsById(state,id){
      state.car.some((item,i) =>{
        if(item.id == id){
          state.car.splice(i,1);
          return true;
        }
      });
      localStorage.setItem('goods',JSON.stringify(state.car));
    }
  }
});
export default store;
