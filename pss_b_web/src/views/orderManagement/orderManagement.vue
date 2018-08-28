<template>
     <div class="orderManagement">
        <div class="headerbox">
            <div class="headerboxone" style="">
                <el-input placeholder="请输入内容" v-model="inputContent">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="headerboxthree">
                <el-button type="primary" @click="search(inputContent,value4)">查询</el-button>
            </div>
            <div class="addOrder">
                <el-button type="primary" @click="dialogFormVisible = true">+新增订单</el-button>
            </div>
        </div>

        <el-dialog title="新增订单" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="订单号" :label-width="formLabelWidth">
                <el-input v-model="form.id" auto-complete="off"></el-input>
            </el-form-item>
             <el-form-item label="桌号" :label-width="formLabelWidth">
                 <el-input v-model="form.tablenum" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否会员" :label-width="formLabelWidth">
                <p>是</p>
            </el-form-item>
            <el-form-item label="菜品" :label-width="formLabelWidth">
                <el-table
                        ref="multipleTable"
                        :data="form.content"
                        tooltip-effect="dark"
                        style="width: 100%" max-height="1000"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            label="菜编号"
                            width="70">
                        <template slot-scope="scope">{{ scope.row.id }}</template>
                    </el-table-column>
                    <el-table-column
                            label="菜名称"
                            width="100">
                        <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column
                            label="菜数量"
                            width="70">
                        <template slot-scope="scope">{{ scope.row.quantity}}</template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="金额" :label-width="formLabelWidth">
                <el-input v-model="form.price" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
                <el-input v-model="form.status" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm(form)">确 定</el-button>
        </div>
        </el-dialog>

        <div class="tablebox">

          <el-table
            ref="multipleTable"
            :data="orderlcontent"
            tooltip-effect="dark"
            style="width: 100%" max-height="1000"
            @selection-change="handleSelectionChange">
            <el-table-column
            label="订单号"
            width="120">
            <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column
            prop="name"
            label="桌号"
            width="120">
             <template slot-scope="scope">{{ scope.row.tablenum }}</template>
            </el-table-column>
            <el-table-column
               prop="price"
               label="会员"
               width="150">
               <template slot-scope="scope">是</template>
            </el-table-column>
            <el-table-column
            prop="id"
            label="菜品"
            width="300">
             <template slot-scope="scope">
                 <el-table
                         ref="multipleTable"
                         :data="scope.row.content"
                         tooltip-effect="dark"
                         style="width: 100%" max-height="1000"
                         @selection-change="handleSelectionChange">
                     <el-table-column
                             label="菜编号"
                             width="70">
                         <template slot-scope="scope">{{ scope.row.id }}</template>
                     </el-table-column>
                     <el-table-column
                             label="菜名称"
                             width="100">
                         <template slot-scope="scope">{{ scope.row.name }}</template>
                     </el-table-column>
                     <el-table-column
                             label="菜数量"
                             width="70">
                         <template slot-scope="scope">{{ scope.row.quantity}}</template>
                     </el-table-column>
                 </el-table>
             </template>
            </el-table-column>
            <el-table-column
            prop="description"
            label="金额"
            width="120">
             <template slot-scope="scope">{{ scope.row.price }}</template>
            </el-table-column>
            <el-table-column
            prop="address"
            label="状态"
            width="100">
             <template slot-scope="scope">{{ scope.row.status }}</template>
            </el-table-column>
            <el-table-column
            prop="address"
            label="操作"
            width="260">
             <template slot-scope="scope">
                 <el-button
                    size="mini"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                 <el-button
                    size="mini"
                    type="danger"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                 <el-button
                         size="mini"
                         type="danger"
                         @click="handleEdit(scope.$index, scope.row)">优先</el-button>
             </template>
            </el-table-column>
        </el-table>

        </div>


     </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';
export default {
   data() {
      return {
        index:'',
        inputContent:'',
        options: [],
        value4: '',
        orderlcontent: [],
        multipleSelection: [],
        dialogFormVisible: false,
        formCategoryId: '',
        form: {
          name: '',
          imgUrl: '',
          description: '',
          price: '',
          stock: '',
        },
        formLabelWidth: '80px',
        dialogImageUrl: '',
        dialogVisible: false,
        choseNum: 0,
      }
    },
    computed: {
        ...mapGetters([
            'userInfo',
        ])
    },
    created(){
        var _this = this;
        var param = {
            categoryId: '',
            foodName: '',
            shopId: '1'
        };
        this.getOrder(param).then(res => {
            if(res.errno == 0){
                _this.orderlcontent = res.data;
                for(var i=0;i<_this.orderlcontent.length;i++){
                    _this.orderlcontent[i].content = JSON.parse(_this.orderlcontent[i].content);
                }
            }
        })
    },
    methods:{
        ...mapActions([
            "getUserInfo",
            "getOrder"
        ]),
       toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        console.log(val.length,'选中的条数');
        this.multipleSelection = val;
        this.choseNum = val.length;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      successUpPicture(response, file, fileList){
        console.log(response,file,fileList,'服务器成功返回');
        this.dialogImageUrl = response.data;
        this.form.imgUrl = response.data;
      },
      search(inputName,categorys){
        console.log(inputName,categorys,'查询的内容');

      },
      confirm(item){
        var _this = this;
        _this.dialogFormVisible = false;
        var food = {
            imgUrl: item.imgUrl,
            name: item.name,
            description: item.description,
            price: item.price,
            stock: item.stock,
            categoryId: this.formCategoryId,
            shopId: 1
        };
        console.log(food,'保存商品1');
        axios.post('/food/addFood',food).then(function(res){
            console.log(res,'保存商品2');
            if(res.data.errno == 0){
//                 window.location.reload();
            }
        })
      },
        /*编辑订单*/
      handleEdit(index,row){
          var _this = this;
          console.log(index,row,'要编辑的行');
          _this.dialogFormVisible = true;
          _this.form = row;
          _this.formCategoryId = row.categoryId;
          _this.dialogImageUrl = row.imgUrl;
          console.log(_this.form,_this.formCategoryId,_this.dialogImageUrl,'放到弹窗内');
      },
        /*删除订单*/
      handleDelete(index,row){
          var _this = this;
          console.log(index,row,'要删除的行');
          var params = {id:row.id};
          axios.post('/order/deleteOrder',params).then(function(res){
              console.log(res,'删除订单');
              if(res.data.errno == 0){
                   window.location.reload();
              }
          })
      }

    }
}
</script>

<style scoped>
.headerbox{
    margin-top: 15px;
}
.headerboxone{
        width: 300px;
        display: inline-block;
}
.headerboxtwo{
    display: inline-block;
    margin-left: 20px;
}
.headerboxthree{
    display:inline-block;
    margin-left: 20px;
}
.addOrder{
    float: right;
}

.choseresult{
    margin-top: 10px;
    padding: 10px;
    background-color: rgba(230, 247, 255, 1);
    border-color: rgba(186, 231, 255, 1);
    border-radius:4px;
    font-size: 14px;
}
.choseresult span{
    color:#5579ee;
    margin: 0px 4px;
}
.choseresult a{
    color:#5579ee;
    margin-left: 20px;
    cursor: pointer;
}
.tablebox{
    margin-top: 10px;
    border-top: 1px solid #ebeef5;
}
</style>
