<template>
	<div class="app">
		<mt-swipe :auto="4000">
  		<mt-swipe-item v-for="(item,index) in list" :key="index">
        <img :src="item.images.medium">
      </mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<script>
	export default{
		data() {
			return {
			list:[],
			temp:[]
		}
	},
	created(){
		this.getImage()
	},
	methods:{
		getImage(){
			this.axios.get('api/movie/in_theaters')
			.then(res=>{
				for(let i = 0; i < 5; i++){
					this.temp[i] = res.data.subjects[i]
				}
				this.list = this.temp
				console.log(this.list)
			})
			.catch(err=>{
				console.log(err)
			})
		}
	}
	}
</script>
<style lang='less' scoped>
	.app .mint-swipe {
  height: 230px;
  .mint-swipe-item img {
    width: 100%;
    // height: 100%;
  }
}
</style>