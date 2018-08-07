<template>
     <div class="orderManagement">
        <div class="headerbox">
            <div class="headerboxone" style="">
                <el-input placeholder="请输入内容" v-model="inputContent">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="headerboxtwo">
                <el-select v-model="value4" clearable placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.id + item.name"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="headerboxthree">
                <el-button type="primary" @click="search(inputContent,value4)">查询</el-button>
                <el-button @click="inputContent='';value4=''">重置</el-button>
            </div>
        </div>
        <div class="headerboxspe">
            <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
            <el-button icon="el-icon-delete" @click="deleteChoseItem()">删除</el-button>
        </div>

        <el-dialog title="新增菜品" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="菜名" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="类别" :label-width="formLabelWidth">
            <el-select v-model="formCategoryId" clearable placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="菜的照片" :label-width="formLabelWidth">
            <el-upload
                action="/food/uploadFile"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-success="successUpPicture"
                :on-remove="handleRemove"
                >
                <i class="el-icon-plus" v-if="!dialogImageUrl"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" v-model="form.imgUrl" :src="dialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
             <el-form-item label="菜描述" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="form.description">
            </el-input>
            </el-form-item>
            <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="form.price" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="库存" :label-width="formLabelWidth">
            <el-input v-model="form.stock" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm(form)">确 定</el-button>
        </div>
        </el-dialog>

        <div class="choseresult"><i class="el-icon-warning"></i>已选择<span>{{choseNum}}</span>项<a @click="toggleSelection()">清空</a></div>

        <div class="tablebox">

          <el-table
            ref="multipleTable"
            :data="foodlcontent"
            tooltip-effect="dark"
            style="width: 100%" max-height="1000"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            label="大类"
            width="120">
            <template slot-scope="scope">{{ scope.row.categoryName }}</template>
            </el-table-column>
            <el-table-column
            prop="name"
            label="菜名"
            width="120">
             <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
               prop="price"
               label="价格"
               width="90">
               <template slot-scope="scope">{{ scope.row.price.toFixed(2)}}</template>
            </el-table-column>
            <el-table-column
            prop="id"
            label="编号"
            width="100">
             <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column
            prop="description"
            label="详情"
            width="320">
             <template slot-scope="scope">{{ scope.row.description }}</template>
            </el-table-column>
            <el-table-column
            prop="address"
            label="状态"
            width="90">
             <template slot-scope="scope">{{ scope.row.stock }}</template>
            </el-table-column>
            <el-table-column
            prop="stock"
            label="库存"
            width="90">
             <template slot-scope="scope">{{ scope.row.stock }}</template>
            </el-table-column>
            <el-table-column
            prop="address"
            label="操作"
            width="150">
             <template slot-scope="scope">
                 <el-button
                    size="mini"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                 <el-button
                    size="mini"
                    type="danger"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
             </template>
            </el-table-column>
        </el-table>
            
        </div>


     </div>
</template>

<script>
import axios from 'axios';
export default {
   data() {
      return {
        index:'',
        inputContent:'',
        options: [],
        value4: '',
        foodlcontent: [],
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
    created(){
        var _this = this;
        var categorylevel = {
            shopId: '1'
        };
        axios.post('/food/getCategory',categorylevel).then(function(res){
            if(res.data.errno == 0){
                _this.options = res.data.data;
                console.log(_this.options,'菜类目');
            }
        }).catch(function(err){
            console.log(err);
        });
        var param = {
            categoryId: '',
            foodName: '',
            shopId: ''
        }
        axios.post('/food/getFood',param).then(function(res){
            if(res.data.errno == 0){
                _this.foodlcontent = res.data.data;
                console.log(_this.foodlcontent,'菜详情');
                for(var i =0;i< _this.foodlcontent.length;i++){
                    for(var j =0;j<_this.options.length;j++){
                        if( _this.foodlcontent[i].categoryId == _this.options[j].id){
                            res.data.data[i].categoryName = _this.options[j].name;
                        }
                    }
                }
                _this.foodlcontent = res.data.data;
            }
           
        }).catch(function(err){
            console.log(err);
        });

    },
    methods:{
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
        /*删除选中的行*/
      deleteChoseItem(){
          var choseItems = this.multipleSelection;
          var array = [];
          for(var i=0;i<choseItems.length;i++){
              array.push({id: choseItems[i].id});
          }
          console.log(array,'要删除菜的id的数组');
          axios.post('/food/deleteChoose',array).then(function(res){
              console.log(res,'要删除选中的菜');
              if(res.data.errno == 0){
                   window.location.reload();
              }
          })
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
                 window.location.reload();
            }
        })
      },
        /*编辑菜*/
      handleEdit(index,row){
          var _this = this;
          console.log(index,row,'要编辑的行');
          _this.dialogFormVisible = true;
          _this.form = row;
          _this.formCategoryId = row.categoryId;
          _this.dialogImageUrl = row.imgUrl;
          console.log(_this.form,_this.formCategoryId,_this.dialogImageUrl,'放到弹窗内');
      },
        /*删除菜*/
      handleDelete(index,row){
          var _this = this;
          console.log(index,row,'要删除的行');
          var params = {id:row.id};
          axios.post('/food/deleteFood',params).then(function(res){
              console.log(res,'保存商品2');
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
.headerboxspe{
    margin-top: 20px;
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