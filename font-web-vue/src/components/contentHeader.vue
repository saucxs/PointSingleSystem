<template>
  <div class="contentHeader">
    <div class="headerTop">
      <div class="centerBox clearfix">
        <a class="floatLeft" v-if="!homepage" href="?route=common/home"><img src="../../../static/img/ic_home.png" style="margin-right: 8px;">返回首页 </a>
        <div class="toolbar-right fr">
          <div class="supplier fl">
            <a style="border-right:1px solid #747474;padding-right: 15px;" :href="headData.agencyUrl">商户登录</a>
          </div>
          <div v-if="!headData.username" class="clearfix">
            <div class="login fl">
              <a style="padding:0" href="?route=account/login"><span class="icon-user"></span>登录</a>
            </div>
          </div>
          <div v-if="headData.username || false" class="user-name">
            <a class="isJoin" href="javascript:void(0);">
              {{headData.username}}
            </a>
            <div class="layout">
              <a href="?route=account/logout">退出</a>
            </div>
          </div>
          <div v-if="headData.username || false" class="user-center">
            <a href="javascript:void(0);">个人中心</a>
            <div class="user-center-down">
              <ul>
                <li>
                  <a href="?route=account/account">我的帐户</a>
                </li>
                <li>
                  <a href="?route=order/wfp">待支付订单
                    <span v-if="headData.username || false">（{{headData.unpayNum | fomatValue}}）</span>
                  </a>
                </li>
                <li>
                  <a href="?route=order/all">全部订单</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="headerBody">
      <div class="centerBox headerBodyBox clearfix">
        <div class="inlineBlock povertyTitle">
          <a href="?route=common/home"><img src="../../../static/img/ic_logo.png"></a>
        </div>
        <div class="inlineBlock searchInput">
          <form method="get" @submit.prevent="goSearch">
            <div class="input-with-select">
              <em class="absolute" v-if="showHolder">请输入关键字搜索商品／品牌</em>
              <input class="searchKeyword relative" @keyup.enter="goSearch" v-model="searchData"  type="text" @click="initSearch" @blur="initSearchData" maxlength="50"/>
              <!-- <input class="search-btn" type="button" value="搜索" @click="goSearch" /> -->
              <a class="searchBtn" :href="myDevUrl + 'product/search&wd=' + searchData">搜索</a>
            </div>
          </form>
          <!--<el-input placeholder="请输入内容" v-model="searchData" class="input-with-select">
            <el-button type="primary" slot="append" icon="el-icon-search"  :href="myDevUrl + 'product/search&wd=' + searchData">搜索</el-button>
          </el-input>-->
        </div>
        <div class="inlineBlock mallCar">
          <a  :href="myDevUrl+'cart/list'">
            <div round style="width: 160px;padding: 4px;border-radius: 30px;background: #F5F5F5;display: flex;">
              <div style="display: inline-block"><img style="margin: 2px 0 1px 12px;" src="../../../static/img/ic_gwc.png"></div>
              <div style="display: inline-block;padding: 9px 15px;font-size: 14px;">购物车</div>
              <span class="shoppingCar">{{headData.shoppingcart.num}}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="thirTitle">
      <div class="centerBox">
        <div class="whiteAllArea">
          <img class="thirTitle_banner" src="../../../static/img/ceea.png" alt="">
          <span style="font-size: 16px;  color: #FFFFFF;">全部专区</span>
        </div>
        <div class="linkStyle">
          <a href="?route=common/home" class="link" :class="{'linkActive':homepage}">首页</a>
          <a class="link povertyLink" :class="{'linkActive':povertyProduct}">扶贫特产</a>
          <div class="povertyLinkList">
            <div class="listItem" v-for="(item,index) in headData.menuList" :key="index"><a :href="'?route=product/search&categoryId='+ item.category_id" class="link" :title="item.category_name">{{item.category_name}}</a></div>
          </div>
          <a href="?route=groupon/index" class="link" :class="{'linkActive':groupon}">优惠团购</a>
          <a href="?route=trip/index" class="link" :class="{'linkActive':trip}">扶贫旅游</a>
          <a href="?route=article/article/about" class="link" :class="{'linkActive':about}">联盟介绍</a>
          <a href="?route=article/article" class="link" :class="{'linkActive':article}">联盟动态</a>
        </div>
      </div>

    </div>
    <!--返回顶部-->
    <div class="float-tool">
      <!--<div class="help-wtt-hide" sat-id="1470710502447">
        <a href="javascript:void(0);" ></a>
      </div>-->
      <div sat-id="1470710502447">
        <a class="back-top" ></a>
      </div>
    </div>

    <!--浮动的搜索框 -->
    <div class="float-search">
      <div class="search-all">
        <div class="inlineBlock povertyLogo">
          <img src="../../../static/img/ic_logo.png">
        </div>
        <div class="inlineBlock searchInputSpe">
          <form method="get" @submit.prevent="goSearch">
            <div class="input-with-select">
              <em class="absolute" v-if="showHolder">请输入关键字搜索商品／品牌</em>
              <input class="searchKeywordSpe relative" @keyup.enter="goSearch" v-model="searchData"  type="text" @click="initSearch" @blur="initSearchData" maxlength="50"/>
              <!-- <input class="search-btn" type="button" value="搜索" @click="goSearch" /> -->
              <a class="searchBtnSpe" :href="myDevUrl + 'product/search&wd=' + searchData">搜索</a>
            </div>
          </form>
          <!--<el-input placeholder="请输入内容" v-model="searchData" class="input-with-select">
            <el-button type="primary" slot="append" icon="el-icon-search"  :href="myDevUrl + 'product/search&wd=' + searchData">搜索</el-button>
          </el-input>-->
        </div>
        <div class="inlineBlock mallCarSpe">
          <a :href="myDevUrl+'cart/list'">
            <div round style="width: 160px;padding: 4px;border-radius: 30px;background: #F5F5F5;display: flex;">
              <div style="display: inline-block"><img style="margin: 2px 0 1px 12px;" src="../../../static/img/ic_gwc.png"></div>
              <div style="display: inline-block;padding: 9px 15px;font-size: 14px;">购物车</div>
              <span class="shoppingCar" v-if="headData.shoppingcart">{{headData.shoppingcart.num}}</span>
            </div>
          </a>
        </div>
      </div>
    </div>



  </div>

</template>

<script>
  import Vue from 'vue';
  import { myDevUrl } from 'configPath/index';
  import { myLinkUrl } from 'configPath/index';
  import '../common/styles/common.css';
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  Vue.use(ElementUI);
  import $ from 'jquery';

  require('babel-polyfill');
  import axios from 'axios';
  import { mapActions, mapGetters } from "vuex";
  // import vCart from 'viewsPath/cartbar/cartbar.vue';

  const querystring = require('querystring');
  $(()=>{
    // 头部的右边下拉
    /* 顶部下拉 */
    const uc = $('.user-center');
    const ucd = $('.user-center-down');
    const layOut = $('.user-name');
    const layOutd = $('.layout');
    const hc = $('.help-center');
    const hcd = $('.help-center-down');
    // const ct = $('.shopping');
    // const hct = $('.shopCart');

    function mySlideUp(a, b) {
      a.hover(() => {
        b.stop(false, true).show();
      }, () => {
        b.stop(false, true).hide();
      });
    }
    mySlideUp(uc, ucd);
    mySlideUp(hc, hcd);
    // mySlideUp(ct, hct);
    mySlideUp(layOut, layOutd);
    // 返回顶部
    $(window).scroll(function() {
      if($(this).scrollTop() != 0) {
        $('.back-top').fadeIn();
      } else {
        $('.back-top').fadeOut();
      }
    });
    $(".back-top").on("click",function(){$("html,body").animate({scrollTop:"0"})});
    // 悬浮头部
    $(window).scroll(function() {
      if($(this).scrollTop() >= 300) {
        $('.float-search').fadeIn();
      } else {
        $('.float-search').fadeOut();
      }
    });
// 扶贫特产下拉
    $('.povertyLink').hover(function(){
      $('.povertyLinkList').show();
    },function(){
      $('.povertyLinkList').hide();
    });
    $('.povertyLinkList').hover(function(){
      $('.povertyLinkList').show();
    },function(){
      $('.povertyLinkList').hide();
    });

  })

  export default {
    data() {
      return {
        nowIndex: "-1",
        querystring,
        searchData: '',
        myLinkUrl: myLinkUrl,
        myDevUrl: myDevUrl,
        homepage:false,
        groupon:false,
        trip:false,
        about:false,
        article:false,
        povertyProduct:false,
        showHomeIcon: true,
      };
    },

    methods: {
      loginSup() {
        var _this = this;
        // login
        axios.post('http://10.37.186.123:8080/page/login',
          _this.querystring.stringify({
            appId: _this.headData.appId,
            webUrl: _this.headData.webUrl
          }))
          .then(function(res) {

          })
          .catch(function(err) {
            // console.log(err);
          });
        // end
      },
      userJoin() { // 验证用户登录
        window.location.href = "?route=account/login";
        // this.productCart.showBar = true;
        // this.productCart.message = '未登录';
        // this.productCart.keepOn = '继续浏览';
        // this.productCart.doSth = '前往登录';
        // this.productCart.toLink = this.myDevUrl + 'account/login';
      },
      inCart() {
        this.productCart.showBar = true;
        this.productCart.message = '加入购物车成功';
        this.productCart.keepOn = '稍后结算';
        this.productCart.doSth = '去购物车结算';
        this.productCart.toLink = this.devUrl + 'cart/list';
      },
      unionNav(option,index) {
        this.$router.push({path:option.path})
        this.nowIndex = index;
      },
      initSearch() {
        if (this.searchData == '') {
          this.showHolder = false;
        }
      },
      initSearchData() {
        if (this.searchData == '') {
          this.showHolder = true;
        }
      },
      goSearch() {
        window.location.href = this.myDevUrl + 'product/search&wd=' + this.searchData;
      },
      getUrl() {
        const protol = window.location.protocol;
        const domainName = window.location.hostname;
        let pathName = window.location.pathname;

        let pathNameArr = [];
        pathNameArr = pathName.split('/');
        let len = pathNameArr.length - 1;
        pathNameArr.splice(len, 1);
        pathName = pathNameArr.join('/')
        return protol + domainName + pathName + '/';
      }
    },
    props: {
      headData: {
        type: Object
      }
    },
    created(){
      if(location.href.indexOf('common/home')>0 || location.href.indexOf('?router')<=0){
        this.homepage = true;
      }
      if(location.href.indexOf('groupon/index')>0){
        this.groupon = true;
      }
      if(location.href.indexOf('trip/index')>0){
        this.trip = true;
      }
      if(location.href.indexOf('/about')>0 && location.href.indexOf('article/article')>0){
        this.about = true;
      }
      if(location.href.indexOf('article/article')>0 && location.href.indexOf('/about')<=0){
        this.article = true;
      }
      if(location.href.indexOf('product/search&categoryId')>0){
        this.povertyProduct = true;
      }
    }

  };
  // console.log(this.props.headData,'pops.headData');
</script>

<style scoped>
  a{
    cursor: pointer;
    color: #666;
    padding:0;
    margin:0;
  }
  .input-with-select{
    border: 2px solid rgba(255,255,255,0.20)
  }
  .floatLeft{
    float: left;
  }
  .floatRight{
    float: right;
  }
  .inlineBlock{
    display: inline-block;
  }
  .centerBox{
    width: 1170px;
    margin: 0 auto;
  }
  .whiteAllArea{
    display: inline-block;width: 180px;height: 42px;line-height: 42px;background-color:#ED4747;text-align: center;
  }
  .el-input-group{
    background-color: rgba(255,255,255,0.20) !important;
  }

  .el-input-group__append button.el-button{
    background: #22366D !important;
    border: 2px solid rgba(255,255,255,0.20) !important;
  }
  .el-input-group__append .el-button{
    margin: -10px -21px !important;
  }
  .el-input__inner{
    background-color: rgba(255,255,255,0.20) !important;
  }

  .contentHeader {
    width: 100%;
  }
  .headerTop{
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #F5F5F5;
    font-size: 12px;
    color: #666;
  }
  .headerBody{
    background: #22366D;
  }
  .headerBodyBox{
    display: flex;
  }
  .povertyTitle{
    margin: 10px 60px 8px 0;
    /*border-left: 1px solid #fff;*/
    /*padding: 0px 30px;*/
  }
  .logoBox{
    width: 72px;
    height: 72px;
  }
  .logoBox img{
    width:100%;
  }
  .povertyArea{
    font-size: 24px;
    color: #fff;
    letter-spacing: 15px;
    margin-bottom: 5px;
  }
  .povertyAreaEnglish{
    font-size: 12px;
    color: #FFFFFF;
  }
  .searchInput{
    width: 520px;
    height: 42px;
    margin-top: 30px;
  }
  .mallCar{
    width: 160px;
    height: 42px;
    margin: 30px 0 0 159px;
    cursor: pointer;
  }

  .secondTitle img {
    margin-left: 13%;
    height: 90px;
    margin-top: 5px;
  }
  .thirTitle {
    width: 100%;
    height: 42px;
    display: inline-block;
    background-color: #21346f;
  }
  .thirTitle_banner {
    display: inline-block;
    width: 88px;
    height: 14px;
  }

  .el-menu-item a {
    text-decoration: none;
    display: block;
    height: 48px;
    /* border:1px solid red; */
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    color: #ffffff !important;
    border-bottom: none;
  }

  .linkStyle{
    display: inline-block;
  }
  .linkActive{
    color: #fff !important;
  }
  .linkStyle .link{
    display: inline-block;
    padding: 13px 25px;
    /* border:1px solid #41b883; */
    color: rgba(132,173,247,0.80);;
    text-decoration: none;
    cursor: pointer;
  }
  .listItem{
    white-space: nowrap;
    overflow: hidden;
    padding: 0 14px;
  }
  .listItem a{
    padding: 8px 0 !important;
  }
  .router-link-active{
    /* background-color: #41b883; */
    color: #fff !important;
  }
  .povertyLinkList{
    display:none;position: absolute;margin-left: 80px;width: 140px;background: #22366D;box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20); border-radius: 2px;z-index: 500;
  }

  .listItem:hover{
    background: rgba(255,255,255,0.10);
  }

  .float-tool{
    position: fixed;
    _position: absolute;
    bottom: 33%;
    right: 60px;
    z-index: 250;
    margin-bottom: -90px;
  }

  .float-search{
    width:100%;
    position: fixed;
    top: 0;
    z-index: 2500;
    background: #22366D;
    display:none;
  }
  .povertyLogo{
    margin-right: 60px;
  }
  .search-all{
    width:1170px;
    margin:0 auto;
    display: flex;
  }
  .searchInputSpe{
    width: 520px;
    height: 42px;
    margin: 16px 0px;
  }
  .input-with-select-spe{
    border: 2px solid rgba(255,255,255,0.20);
  }
  .searchKeywordSpe{
    height: 38px;
    width: 420px;
    padding: 2px 10px;
    background: rgba(255,255,255,0.20);
    border: 1px solid rgba(255,255,255,0.20);
    font-size: 14px;
    color: #fff;
    border: none;
    outline: none;
  }
  :focus{
    outline:0;
  }
  .searchBtnSpe{
    border: none;
    width: 94px;
    height: 36px;
    line-height: 36px;
    float: right;
    background: #22366D;
    font-size: 16px;
    padding: 0;
    text-align: center;
    color: #fff;
  }
  .mallCarSpe{
    width: 160px;
    height: 42px;
    cursor: pointer;
    margin: 16px 0px 0px 160px;
  }

  .back-top{
    width: 45px;
    height: 45px;
    position: absolute;
    bottom: 10px;
    display: block;
    background: url(images/ic_top_n.png) center center;
    margin-top: 15px;
  }
  .back-top:hover{
    background: url(images/ic_top_n_copy.png) center center;
  }

  .help-wtt-hide a {
    display: block;
    width: 45px;
    height: 45px;
    position: absolute;
    bottom: 70px;
    background: url(images/ic_contact_n.png) center center;
  }
  .help-wtt-hide a:hover {
    display: block;
    width: 45px;
    height: 45px;
    background: url(images/ic_contact_n_copy.png) center center;
  }
  .searchKeyword{
    height: 38px;
    width: 420px;
    padding: 2px 10px;
    background: rgba(255,255,255,0.20);
    border: 1px solid rgba(255,255,255,0.20);
    font-size: 14px;
    color: #fff;
    border: none;
    outline: none;
  }
  :focus{
    outline:0;
  }
  .searchBtn{
    border: none;
    width: 94px;
    height: 36px;
    line-height: 36px;
    float: right;
    background: #22366D;
    font-size: 16px;
    padding: 0;
    text-align: center;
    color: #fff;
  }
  .searchBtn:hover{
    background: #22366D;
    color: #fff;
  }
  .shoppingCar{
    width: 34px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    border-radius: 50%;
    background: rgb(237, 71, 71);
    color: rgb(255, 255, 255);
    float: right;
    /*text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
    /*overflow: hidden;*/
  }





  .toolbar-right>div {
    float: left;
    height: 30px;
  }

  .toolbar-right .supplier {
    width: 70px;
    position: relative;
  a {
    color: #747474;
  }
  .submit {
    border: none;
    margin: 0;
    padding: 0;
    background: none;
    color: #747474;
    cursor: pointer;
  }
  }

  .toolbar-right .supplier::after {
    content: '';
    display: inline-block;
    position: absolute;
    width: 0;
    right: 0;
    top: 8px;
    height: 14px;
  // border-right: 1px solid #747474;
  }

  .toolbar-right .login {
    padding: 0px 10px;
  }

  .toolbar-right .isJoin {
    color: #EC4747;
  }

  .toolbar-right .layout {
    display: none;
    position: absolute;
    width: 100%;
    overflow: hidden;
    top: 28px;
    left: -1px;
    background-color: #ffffff;
    text-align: center;
    z-index: 666;
    border-top: 0;
    cursor: pointer;
  a {
    display: block;
  }
  }

  .toolbar-right .login span {
    display: inline-block;
    width: 16px;
    font-size: 16px;
    vertical-align: text-top;
    margin-right: 4px;
  }

  .user-center,
  .help-center,
  .user-name {
    position: relative;
    padding: 0 3px;
  }

  .user-name:hover {
    background-color: #ffffff;
    border-bottom: 0;
  }

  .user-center>a,
  .help-center>a {
    display: inline-block;
    width: 70px;
    text-align: center;
    position: relative;
  }

  .user-center:hover>a,
  .help-center:hover>a {
    background-color: #ffffff;
    width: 70px;
    text-align: center;
    border-bottom: 0;
    z-index: 998;
  }

  .user-center>a::after,
  .help-center>a::after {
  @include icon-arrow;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 4px solid #747474;
    transition: transform .3s ease-in;
  }

  .help-center>a::after {
    right: 10px;
  }

  .user-center:hover>a::after,
  .help-center:hover>a::after {
  @include icon-arrow;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 4px solid #747474;
    transform: rotate(180deg);
    transition: transform .3s ease-in;
  }

  .help-center:hover>a::after {
    right: 10px;
  }

  .user-center .user-center-down,
  .help-center .help-center-down {
    display: none;
    position: absolute;
    width: 118px;
    overflow: hidden;
    top: 30px;
    background-color: #ffffff;
    z-index: 666;
  }

  .help-center .help-center-down {
    width: 70px;
  }

  .user-center-down ul li a,
  .help-center-down ul li a {
    color: #181818;
    display: block;
    line-height: 25px;
    padding-left: 10px;
  }

  .help-center-down ul li:hover a,
  .user-center-down ul li:hover a,
  .layout a:hover {
    background: #EC4747;
    color: #ffffff;
  }



</style>
