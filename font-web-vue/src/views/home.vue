<template>
  <div id="home">
    <navbar class="navbar"></navbar>
    <div class="container">
      <router-view></router-view>
    </div>
    <sidebar ref="lefeMenu" class="sidebar"></sidebar> 
  </div>
</template>

<script>
import navbar from "@/components/navBar";
import sidebar from "@/components/sideBar";

export default {
  name: 'home',
  components: {
    navbar,
    sidebar,
  },
}
</script>

<style type="text/css">
#category .dialogMinWidth{
  min-width:800px;
}
a {
  text-decoration: none;
}

#choseGoods .chooseGoodsTree .el-card__body,
#category .category_tree .el-card__body {
  padding-right: 0;
}

*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-track {
  background: #fff;
}

*::-webkit-scrollbar-thumb {
  background: #409eff;
  border-radius: 2px;
}

#addBanner .el-upload,
#editBanner .el-upload {
  display: block !important;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 60px;
}

.container {
  margin: 60px 0 0 180px;
  padding: 10px 20px;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 60px;
  width: 180px;
  height: 100%;
}
</style>