<template>
<div class="contentFooter">
  <div class="contentOne" v-if="footTopNone">
    <div class="centerBox">
      <div class="boxTitle">
        <p>中央企业电子商务联盟</p>
        <p>China Central Enterprise E-commerce Alliance</p>
      </div>
      <div class="boxContent">
        <p>联系邮箱：{{bottomData.contact.contact_email}}</p>
        <p>联系电话：{{bottomData.contact.contact_mobile}}</p>
      </div>
      <div class="boxContentAddress">
        <p>联系人：{{bottomData.contact.contact_name}}</p>
        <p>地址：{{bottomData.contact.contact_address}}</p>
      </div>
    </div>
  </div>
  <div class="contentTwo">
    <div class="centerBox">
      <div class="boxInfo">
        <div class="boxInfoImg">
          <img src="../../../static/img/ic_pzbz.png">
        </div>
        <div class="boxInfoContent">
          <p>品质保障</p>
          <p>严格品质把关 品质值得信赖</p>
        </div>
      </div>
      <div class="boxInfo">
        <div class="boxInfoImg">
          <img src="../../../static/img/ic_tsfw.png">
        </div>
        <div class="boxInfoContent">
          <p>特色服务</p>
          <p>智能改变生活 环保关系你我</p>
        </div>
      </div>
      <div class="boxInfo">
        <div class="boxInfoImg">
          <img src="../../../static/img/ic_xdjg.png">
        </div>
        <div class="boxInfoContent">
          <p>心动价格</p>
          <p>精心市场调研 价格打动你心</p>
        </div>
      </div>
      <div class="boxInfo">
        <div class="boxInfoImg">
          <img src="../../../static/img/ic_zfaq.png">
        </div>
        <div class="boxInfoContent">
          <p>支付安全</p>
          <p>专属支付平台 保障交易安全</p>
        </div>
      </div>
    </div>
  </div>
  <div class="contentThree">
    <div class="centerBox marginTop">
      <div :class="{'footerSpe':index!=bottomData.articleList.length}" v-for="(item,index) in bottomData.articleList" :key="index">
        <p class="boxInfoLast">{{item.typeName}}</p>
        <p :class="{'boxInfoLastP':index!=bottomData.articleList.length,'boxInfoLastSpe':index==bottomData.articleList.length}" v-for="(sitem,sindex) in item.child" :key="sindex"><a :href="'?route=article/article/info&id='+ sitem.articleId">{{sitem.title}}</a></p>
      </div>
      <div class="footerLast">
        <p class="boxInfoLast">{{bottomData.contact_service.contact_service_online}}</p>
        <p class="boxInfoLastColor">{{bottomData.contact_service.contact_service_worktime}}</p>
        <p class="boxInfoLastColor">{{bottomData.contact_service.contact_service_email}}</p>
      </div>
    </div>
    <!--<div class="centerBoxSpe">
      <span><a>商城规则</a></span>&nbsp;&nbsp;|&nbsp;&nbsp;<span><a>关于我们</a></span>&nbsp;&nbsp;|&nbsp;&nbsp;<span><a>联系我们</a></span>&nbsp;&nbsp;|&nbsp;&nbsp;<span><a>广告服务</a></span>&nbsp;&nbsp;|&nbsp;&nbsp;<span><a>友情链接</a></span>
    </div>-->
    <div class="centerBoxBeiAn">
    <p>{{bottomData.contact_copyright.contact_copyright_top}}</p>
    <p>{{bottomData.contact_copyright.contact_copyright_bottom}}</p>
      <!--<p>国网商城网站备案号：京ICP备17064178号-1  &nbsp;&nbsp;&nbsp;&nbsp;  国网电子商务有限公司</p>
      <p>商城公网安备号：京公网安备110102001007-3</p>-->
    </div>
    <div class="caLogo">
      <img src="../../../static/img/ca_logo.png" >
    </div>
  </div>
</div>
</template>

<script>
import '../common/styles/common.css'
export default {
data(){
  return{

  }
},
props: {
    footTopNone: {
      type: Boolean
    },
    bottomData: {
      type: Object
    }
  }
}
</script>

<style scoped>
 .contentFooter{
   margin-bottom: 57px;
 }
 .contentOne{
   background: #22366D;height: 120px;
 }
 .centerBox{
   width: 1200px;
   margin: 0 auto;
   display: flex;
 }
 .boxTitle{
   display: inline-block;margin-top: 30px;border-right: 1px solid #ccc;padding-right: 56px;
   color: #fff;
 }
 .boxTitle p:first-child{
   font-size: 30px;letter-spacing: 6px;line-height: 42px;
 }
 .boxTitle p:nth-child(2){
   font-size: 16px;letter-spacing: 0;
 }
 .contentOne .boxContent{
   display: inline-block;color: #ccc;margin: 30px 0 0 30px;line-height: 30px;width: 28%;
 }
 .boxContentAddress{
   display: inline-block;color: #ccc;margin: 30px 0 0 76px;line-height: 30px;
 }
  .contentTwo{
    background: #eee;height: 120px;
  }
  .boxInfo{
    display: flex;margin: 30px 28px 30px 0;
  }
  .boxInfoImg{
    display: inline-block;
    width: 60px;
    height: 60px;
  }
  .boxInfoContent{
    margin-left: 14px;
    line-height: 30px;
  }
  .boxInfoContent p:first-child{
    font-size: 22px;
    color: #22366D;
  }
  .boxInfoContent p:nth-child(2){
    font-size: 16px;
    color: #22366D;
  }
  .contentThree{
    background: #fff;
  }
  .marginTop{
    margin-top: 40px;
  }
  .boxInfoLast{
    font-size: 20px;color: #101800;margin-bottom: 20px;
  }
 .boxInfoLastP{
   font-size: 14px;
   color: #22366D;
   margin-bottom: 14px;
 }
 .boxInfoLastP a{
    color: #22366D;
 }
  .boxInfoLastSpe{
    font-size: 14px;
    color: #22366D;
  }
  .boxInfoLastColor{
    color: #101800;
    font-size: 14px;
    margin-bottom: 14px;
  }
  .centerBoxSpe{
    text-align: center;
    margin-top: 26px;
    font-size: 16px;
    color: #22366D
  }
  .centerBoxSpe a{
    color: #22366D;
    cursor: pointer;
  }
  .centerBoxBeiAn{
    text-align: center;
    margin-top: 16px;
    font-size: 12px;
    color: #101800;
    line-height: 24px;
  }
  .caLogo{
    text-align: center;
    margin-top: 12px;
  }
  .footerSpe{
    width: 17.5%;padding-left: 10px;border-left: 1px solid #ccc
  }
  .footerLast{
    width: 30%;padding-left: 10px;border-left: 1px solid #ccc
  }
</style>
