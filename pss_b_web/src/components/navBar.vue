<template>
  <div class="header">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <div class="header-logo">
          点单系统 ● 后台管理{{userInfo}}
        </div>
      </el-col>
      <el-col :span="11">
        <el-row type="flex" justify="end">
          <el-dropdown>
            <div class="header-user-name">{{userInfo.username}}<i class="el-icon-caret-bottom el-icon--right"></i></div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span @click="signOut()">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "VHeader",
  data() {
    return {

    };
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
        vm.getUserInfo().then(res => {
            console.log(res,'aaaaaaaaaaaaaaaaaaaaaaaaa');

        })
    });
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
      ...mapActions([
          "getUserInfo",
          "logOut"
      ]),
      signOut() {
        this.logOut().then(res => {
            console.log(res,'res');
            if(res.errno == 0){
                this.$router.push({ path: '/login' });
                this.$store.commit("USER_INFO", {});
            }
        })
    }
  },
  created(){
   // var _this = this;
   // axios.post('/user/queryuser').then(function(res){
   //      _this.userInfo = res.data;
   //      console.log(_this.userInfo,'_this.userInfo');
   //  }).catch(function(err){
   //      console.log(err,'err');
   //  });
  }
};

</script>
<style lang="postcss" scoped>
.header {
  color: #fff;
  font-size: 16px;
  background: #409EFF;
  height: 60px;
  line-height: 60px;
  font-weight: 400;
  box-shadow: 0 2px 10px 0 rgb(0, 0, 0, 0.4);
  & .header-user-name {
    cursor: pointer;
    color: #fff;
  }
}

</style>
