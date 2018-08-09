<template>
  <footer>
    <div class="footerItem">
      <router-link :to=/list/+tableNum><i class="el-icon-edit-outline"></i> 点菜</router-link>
    </div>
    <div class="footerItem">
      <router-link :to=/my/+tableNum><i class="el-icon-mobile-phone"></i>我的</router-link>
    </div>
  </footer>
</template>

<script>
    export default {
        data() {
            return {
                tableNum1:'',
                tableNum2:'',
                tableNum: '',
            }
        },
        created() {
            this.tableNum1 = window.location.href.split('my/')[1];
            this.tableNum2 = window.location.href.split('list/')[1];
            this.tableNum3 = window.location.href.split('news/')[1];
            this.tableNum = this.tableNum1 || this.tableNum2 || this.tableNum3;
            console.log(this.tableNum,'this.tableNum')
        },
        methods: {
            addOrder() {
                let param = this.foodDetail.map(v => {
                    console.log(v);
                    return {name: v.name, id: v.id, quantity: v.quantity}
                });
                let params = {
                    content: param,
                    tablenum: this.tableNum
                }
                this.$axios.post('/order/addOrder', params).then(function (result) {
                    console.log(result,'result');
                });
            }
        }
    }
</script>

<style scoped lang="pcss">
  footer {
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    border: 1px solid #ccc;
  }
  footer .footerItem {
    width: 49%;
    text-align: center;
    float: left;
  }
  footer .footerItem:first-child{
    border-right: 1px solid #ccc;
  }
  .selectedFooter{
    color: #5579ee;
  }
</style>
