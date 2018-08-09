<template>
  <div class="myOrder">
    <h2 class="header">资讯</h2>
    <div class="menu">
      <div class="textalign">
        <img src="../assets/logo.png">
      </div>
      <p>
        1、一致性 Consistency
        与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
      </p>
      <p>
        2、反馈 Feedback
        控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
        页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。
      </p>
      <div class="textalign">
        <el-button v-if="!showTicket" size="medium" type="primary">{{timeCount}}，后领取优惠券</el-button>
        <el-button v-if="showTicket" size="medium" type="primary" @click="centerDialogVisible = true">获取优惠券</el-button>
      </div>
      <el-dialog
              title="恭喜你，获得优惠券"
              :visible.sync="centerDialogVisible"
              width="80%"
              center>
        <div class="textalign">
          <div class="ticket">
            <span>￥</span>
            <span>6</span>
          </div>
          <span class="ticket-spe"></span>
          <div class="ticket-spe-2"></div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
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
      centerDialogVisible: false,
      showTicket:false,
      timeCount:''
    }
  },
  created() {
      this.tableNum = window.location.href.split('news/')[1];
      console.log(this.tableNum,'this.tableNum');
      this.resetTime(180);
  },
  methods: {
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
              console.log(_this.timeCount,'_this.timeCount');
              if(_this.timeCount == '00分钟00秒'){
                  _this.showTicket = true;
              }
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
 .textalign{
   text-align: center;
 }
  .ticket {
    width: 118px;
    height: 74px;
    background: rgb(246, 90, 16);
    line-height: 26px;
    color: #fff;
    display: inline-block;
    text-align: center;
  }

  .ticket span:nth-child(1) {
    margin-left: -26px
  }

  .ticket span:nth-child(2) {
    line-height: 74px;
    font-size: 26px;
  }

  .ticket-spe {
    border-right: 1px dashed #fff;
    position: absolute;
    height: 58px;
    line-height: 58px;
    width: 2px;
    top: 8px;
    margin-left: -28px;
  }

  .ticket-spe-2 {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    display: inline-block;
    margin-left: -16px;
    position: relative;
  }

</style>