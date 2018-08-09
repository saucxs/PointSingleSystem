<template>
  <div class="list-main">
    <header>
      <ul :style="'width:'+categorys.length*120+'px;'">
        <li :class="{'selectedHeader':item.id == selectId}" v-for="item in categorys" :key="item.id" @click="changeCategory(item)">
          {{item.name}}
        </li>
      </ul>
    </header>
    <main>
      <div v-if="foods.length>0" class="box" @click="chooseFood(item)" :class="{'selected':item.selected}" v-for="item in foods" :key="item.id">
          <div class="img" @click="showDetail(item)">
            <img :src="item.imgUrl" alt="菜">
          </div>
          <div class="description" >
            <span>{{item.name}}</span>
            <span>￥{{item.price}}</span>
            <input type="checkbox">
          </div>
      </div>
      <div class="box" v-if="foods.length==0">
        <p>暂无菜品</p>
      </div>
    </main>

    <!--弹窗-->
    <el-dialog
            :title=name
            :visible.sync="centerDialogVisible"
            width="80%"
            center>
      <div class="imgCenter">
        <img :src=imgUrl>
      </div>
      <span slot="footer" class="dialog-footer">
        <p>{{description}}</p>
    </span>
    </el-dialog>

    <div class="bottom-bar">
      <div class="orderItem">
        <span>您点的菜</span>
        <span>{{chosenFood.foodList.length}}</span>
        <span>￥: {{chosenFood.price}}</span>
      </div>
      <el-button size="medium" type="primary" @click="enterOrder()">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categorys: [],
      foods: [],
      chosenFood: {
        price: 0,
        foodList: []
      },
      centerDialogVisible:false,
      imgUrl: '',
      description:'',
      name: '',
      selectId:'',
      tableNum:''
    }
  },
  created() {
    let _this = this;
    let param = {
      shopId: 1
    }
    this.$axios.post('/food/getCategory',param).then(data => {
      _this.categorys = data.data.data;
      if(_this.categorys) {
        _this.changeCategory(_this.categorys[0]);
      }
    })
      this.tableNum = window.location.href.split('list/')[1];
      console.log(this.tableNum,'this.tableNum')
  },
  methods: {
    changeCategory(item) {
      this.selectId=item.id
      this.$axios.post('/food/getFood', {categoryId: item.id}).then(data => {
        this.foods = data.data.data;
      })
    },
    chooseFood(item) {
      let index = this.chosenFood.foodList.indexOf(item.id);
      console.log(index,'index');
      if(index > -1) {
        this.chosenFood.foodList.splice(index, 1);
        this.chosenFood.price -= item.price;
        this.chosenFood.price.toFixed(2);
        item.selected = false;
      } else {
        this.chosenFood.foodList.push(item.id);
        this.chosenFood.price += item.price;
        this.chosenFood.price.toFixed(2);
        item.selected = true;
      }
    },
    enterOrder() {
      window.localStorage.setItem('chosenFood', JSON.stringify(this.chosenFood));
      this.$router.push({path: '/my/'+this.tableNum});
    },
    showDetail(item) {
      console.log(item,'item');
      this.centerDialogVisible = true;
      this.imgUrl = item.imgUrl;
      this.description = item.description;
      this.name = item.name;
    }
  }
}
</script>

<style>
header {
  overflow: scroll;
}
main {
  overflow: hidden;
  padding: 14px 10px;
}
main .box {
  width: 49%;
  height: 150px;
  float: left;
  position: relative;
  border: 1px solid transparent;
}
main .box:nth-child(2n+1){
  margin: 0px 2px 10px 0px;
}
main .box .img{
  width: 100%;
  height: 120px;
  position: relative;
}
main .box img {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translateX(-50%) translateY(-50%);
}
ul {
  list-style: none;
  overflow: hidden;
  height:40px;
  line-height: 40px;
}
ul li {
  float: left;
  text-align: center;
  width: 120px;
  height: 40px;
}

.bottom-bar {
  position: fixed;
  bottom: 50px;
  width: 100%;
  background-color: #ccc;
  padding: 10px;
}
.orderItem{
  display: inline-block;
  padding: 0px 20px 0px 10px;
}
.description{
  text-align: center;
}
.imgCenter{
  text-align: center;
  width: 100%;
}
.selectedHeader{
  color: #5579ee;
}
.selected{
  border: 1px solid #5579ee !important;
}
  .confirm{
    padding: 6px 20px;
    border: 1px solid #5579ee;
    border-radius: 4px;
    background: #5579ee;
    color: #fff;
  }

.el-dialog--center .el-dialog__body{
  padding: 10px !important;
}

</style>
