<template>
  <div class="myOrder">
    <h2 class="header">我的菜单</h2>
    <div class="menu">
      <div>
        <p><span class="foodName">桌号：</span><span>{{tableNum}}</span></p>
        <p><span class="foodName">菜名</span><span class="foodName foodNum">数量</span></p>
        <hr>
        <p v-for="item in foodDetail" :key="item.id">
          <span>{{item.name}}</span>
          <span class="foodNum">{{item.quantity}}</span>
        </p>
        <hr>
        <p><span class="foodName">金额：￥</span><span>{{chosenFood.price}}</span></p>
      </div>
      <div class="submitOrder">
        <el-button v-if="alreadySubmit" size="medium" type="primary" @click="addOrder()">提交订单</el-button>
        <span class="tip" v-if="!alreadySubmit">该订单已经下单，等餐ing</span>
        <br>
        <br>
        <p v-if="!alreadySubmit">倒计时：<span>{{timeCount}}</span></p>
        <br>
        <br>
        <a class="" v-if="!alreadySubmit"><router-link :to=/news/+tableNum ><i class="el-icon-mobile-phone"></i>等餐ing，可以阅览资讯，获取减免券</router-link></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chosenFood: {},
      foodDetail: [],
      tableNum: '',
      alreadySubmit: true,
      timeCount:'',
    }
  },
  created() {
    this.chosenFood = JSON.parse(window.localStorage.getItem('chosenFood') || '{"foodList": [], "price": 0}');
    this.$axios.post('/food/queryMultiFood', {list: this.chosenFood.foodList,price:this.chosenFood.price}).then(data => {
        console.log(data)
        this.foodDetail = data.data.data;
      this.foodDetail.forEach(v => {
        v.quantity = 1;
      })
    })
      this.tableNum = window.location.href.split('my/')[1];
      console.log(this.tableNum,'this.tableNum')
  },
  methods: {
    addOrder() {
        this.alreadySubmit = false;
       this.resetTime(600);
      let param = this.foodDetail.map(v => {
        console.log(v);
        return {name: v.name, id: v.id, quantity: v.quantity}
      });
      let params = {
          content: param,
          tablenum: this.tableNum,
          price: this.chosenFood.price
      }
      this.$axios.post('/order/addOrder', params).then(function (result) {
          console.log(result,'result');
      });
    },
    resetTime(time){
        var _this = this;
          var timer=null;
          var t=time;
          var m=0;
          var s=0;
          m=Math.floor(t/60%60);
          m<10&&(m='0'+m);
          s=Math.floor(t%60);
          function countDown(){
              s--;
              s<10&&(s='0'+s);
              if(s.length>=3){
                  s=59;
                  m="0"+(Number(m)-1);
              }
              if(m.length>=3){
                  m='00';
                  s='00';
                  clearInterval(timer);
              }
              _this.timeCount = m+"分钟"+s+"秒";
          }
          timer=setInterval(countDown,1000);
     }
  }
}
</script>

<style>
  .myOrder{
    padding: 10px 20px;
  }
  .header{
    text-align: center;
  }
  .menu{
    margin-top: 14px;
  }
  .menu p{
    margin: 6px 0px;
  }
  .menu p span{
    width:40px;
  }
  .foodName{
    color: #5579ee;
    font-weight:bold;
  }
  .foodNum{
    float: right;
  }
  .submitOrder{
    text-align: center;
  }
  .tip{
    color: darkred;
  }

</style>