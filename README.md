`**~~****``~~**`# moves

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
#### 一.
######项目使用vue全家桶，实现一个简单的豆瓣电影，其中包括的东西比较多，可以学习使用
##### 1.mintui要做修改
###### 因为在页面上处理样式不生效，所以直接修改了style.css文件中的几个地方,首先处理一下checkLIst

```css
.mint-checkbox-core {
  top: 50%;
  -webkit-transform: translate(0, 50%);
  -moz-transform: translate(0, 50%);
  -ms-transform: translate(0, -50%);
  -o-transform: translate(0, -50%);
  transform: translate(0, -50%);
  }
```
###### 还有一个地方，如果你想使用flex布局，就要修改mintui style.css文件中的
```css
.mint-loadmore-content {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 60px;
  box-sizing: border-box;

}
```  
###### 这个源代码是一个空的，你可以自己写，因为在页面设置不起作用，不管什么权重，加上!important也是不生效    
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
