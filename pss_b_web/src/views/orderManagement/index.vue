<template>
   <navbar class="navbar"></navbar>
    <div class="container">
      <router-view></router-view>
    </div>
    <sidebar ref="lefeMenu" class="sidebar"></sidebar> 
</template>

<script>
import navbar from "@/components/navBar";
import sidebar from "@/components/sideBar";
export default {
	name: 'index',
     components: {
    navbar,
    sidebar,
  },
};
</script>

<style scoped>

</style>
