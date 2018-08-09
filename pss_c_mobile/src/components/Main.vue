<template>
<div>
  <router-view></router-view>
  <vfooter></vfooter>
</div>
</template>
<script>
import vfooter from './common/vfooter.vue';
export default {
  name: 'Main',
  components: {
    vfooter
  }
}
</script>

