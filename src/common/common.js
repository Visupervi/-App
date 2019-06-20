const publicFun = {
  getMovieList (url) {
    let totalPage,
      page = 1,
      allLoaded = false;
  this.axios.get(url)
    .then(res => {
      totalPage = Math.ceil(res.data.total / res.data.count);
      if (page > totalPage) {
        allLoaded = true;
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
      return moveArr;
      this.page++
    }).catch(err => {
    console.log(err);
  })
},
  //轮播图
  getImage(url) {
    let temp = [];
    this.axios.get(url)
      .then(res => {
        for (let i = 0; i < 5; i++) {
          temp[i] = res.data.subjects[i];
          let _u = temp[i].images.medium.substring(8);
          temp[i].images.medium = 'https://images.weserv.nl/?url=' + _u;
        }
        return temp;
      })
      .catch(err => {
        console.log(err)
      })
  },
}
export default publicFun
