<template>
  <div class="app">
    <div id="allmap" class="allmap"></div>
  </div>
</template>

<script>
  import BMap from 'BMap';
  import LocationSDK from "../../common/locationSDK";
  export default {
    name: "findComponent",
    data(){
      return{
        location:{
          latitude:"-1",
          longitude:"-1"
        }
      }
    },
    mounted() {
      let that = this;
      this.getLocation((res)=>{that.ready(res)});

    },
    methods:{
      ready(res){
        let map = new BMap.Map("allmap");
        console.log(res);
        let point = new BMap.Point(res.longitude,res.latitude);
        console.log(point);
        map.centerAndZoom(point,11);

        map.setCurrentCity("上海");
        map.enableScrollWheelZoom(true)
        let local = new BMap.LocalSearch(map,
          { renderOptions:{map: map, autoViewport: true}});
        local.searchNearby("电影院","浦东新区");
      },
      getLocation(callback){
        LocationSDK.getLocation({
          success:(res)=>{
            this.location = res;
            callback(this.location)
          },
          error:(err)=>{
            console.log(err)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
.app{
  height: 100%;
  #allmap{
    height: 100%;
  }
}
</style>
