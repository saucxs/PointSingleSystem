<template>
  <div class="welcome">
    <h2 class="header">这是你的餐桌，请扫码点餐</h2>
    <a> <router-link to="/list/6"><img src="../assets/erweima.png"></router-link></a>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style>
  .welcome{
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