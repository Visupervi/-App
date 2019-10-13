import Axios from 'axios';
import {MessageBox} from 'mint-ui';

export default function Ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    if (type.toLocaleLowerCase() === "get") {
      promise = Axios.get(url, {params: data})
    } else {
      promise = Axios.post(url, data)
    }
    promise.then(res => {
      resolve(res.data)
    }).catch(err => {
      MessageBox(
        {
          title: '提示',
          message: err.message,
          showCancelButton: true
        }
        )
      })
    }
  )
}
