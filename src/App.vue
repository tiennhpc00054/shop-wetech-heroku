<template>
  <div id="app">
    <notifications></notifications>
    <router-view/>
  </div>
</template>
<script>
import {socket,store} from './main'
import Notiflix from "notiflix";
export default {
  data(){
    return{
      dataEvent:null,
      data:[]
    }
  },
  created(){
    Notiflix.Notify.Init({fontSize:'15px',timeout:4000,messageMaxLength:200,position:'right-bottom'});
    this.notifSocketOrder()
  },
  methods:{
    notifSocketOrder(){
      socket.on("return-request-order",(data)=>{
        //luu vao chuong thong bao
        store.state.notication.push(data)
        store.state.selectOrder = data
        //gui thong bao realtime
        Notiflix.Notify.Success(
          `Đơn hàng mới từ ${data.username}`,
          function(){
            window.location.href=`/new-order`
          },
        )
      })

    },
  }
}
</script>