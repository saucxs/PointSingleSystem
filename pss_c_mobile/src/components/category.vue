<template>
<div>
  <ul :style="'width:'+categorys.length*100+'px;'">
    <li v-for="item in categorys" :key="item.id">
      {{item.name}}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      categorys: []
    }
  },
  created() {
    let _this = this;
    let param = {
      shopId: 1
    }
    this.$axios.post('/food/getCategory',param).then(data => {
      _this.categorys = data.data.data;
    })
  }
}
</script>

<style scoped>
  ul {
    list-style: none;
    overflow: hidden;
    height:30px
  }
  ul li {
    float: left;
    text-align: center;
    width: 100px;
    height: 30px;
  }
</style>
