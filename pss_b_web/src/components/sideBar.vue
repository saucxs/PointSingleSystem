<template>
  <div id="aside" class="aside">
    <el-menu :router="true" :default-active="$route.path">
      <template >
        <router-link to="/home/orderManagement">
          <el-menu-item index="orderManagement"><span slot="title" class="v-menu-item-name">订单管理</span></el-menu-item>
        </router-link>
        <router-link  to="/home/foodManagement">
          <el-menu-item index="foodManagement">
            <span slot="title" class="v-menu-item-name">菜品管理</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-menu>
  </div>
</template>
<script>
  export default {
    name: "asideItem",
  
  };

</script>
<style lang="postcss" scoped>
  .aside {
    border-right: 1px solid #e6e6e6;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 2px;
    }
    & .el-menu {
      border: none;
      padding-top: 10px;
      padding-bottom: 60px;
      .el-submenu .el-menu-item {
        min-width: 0;
      }
    }
    & .v-menu-item-name {
      font-size: 16px;
    }
  }

</style>
