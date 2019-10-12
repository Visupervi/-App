import Axios from 'axios';
export default function Ajax(url, data = {}, type = "GET") {
  if (type.toLocaleLowerCase() === "get") {
    return new Promise((resolve, reject) => {
      Axios.get(url, {params:data}).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      Axios.post(url, data).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
};
