'use strict'
const Base = require('./base');
const fs = require('fs');
const path = require('path');
module.exports = class extends Base {
  async addCategoryAction() {
    let {
      name,
      shopId
    } = this.post()
    try {
      let shop = await this.model('shop').where({
        id: shopId
      }).select();
      if(think.isEmpty(shop)) {
        return this.fail("商家id错误")
      }
      await this.model('food_category').add({
        name,
        shopId
      })
      return this.success("添加成功");
    } catch(e) {
      return this.fail("添加失败");
    }
  }
  async getFoodAction() {
    let {id, categoryId, foodName, shopId} = this.post();
    const filepath = `/static/`;
    if(id) {
      let sql = `SELECT a.id, a.name,a.description,a.imgUrl,a.stock,b.name as categoryName 
      FROM gs_food a LEFT JOIN gs_food_category b ON a.categoryId=b.id`;
      let raw = await this.model('food').query(sql);
      let food = raw[0];
      food.imgUrl=filepath+food.imgUrl;
      return this.success(food);
    } else if(categoryId) {
      foodName = foodName || '';
      let foods = await this.model('food').where({
        categoryId,
        name: ['like', `%${foodName}%`]
      }).select();
      foods.forEach(v => {
        v.imgUrl=filepath+v.imgUrl;
      })
      return this.success(foods);
    } else if(!categoryId) {
        foodName = foodName || '';
        let foods = await this.model('food').where({
            name: ['like', `%${foodName}%`]
        }).select();
        foods.forEach(v => {
            v.imgUrl=filepath+v.imgUrl;
        })
        return this.success(foods);
    }else if (shopId) {
      let foods = await this.model('food').where({
        shopId
      }).select();
      foods.forEach(v => {
        v.imgUrl=filepath+v.imgUrl;
      })
      return this.success(foods);
    }else {
      this.ctx.status = 400;
      return this.fail("参数错误");
    }
  }
  async uploadFileAction() {
    try {
      const file = this.file('file');
      if(!file) {
        return this.fail("请选择图片！");
      }
      if(file && file.type.includes('image')) {
        let timestamp = new Date().getTime();
        let filename = think.md5(file.name + timestamp) +'.'+ file.name.split('.').splice(-1);
        const filepath = path.join(think.ROOT_PATH, `www/static/${filename}`);
        think.mkdir(path.dirname(filepath));
        await fs.rename(file.path, filepath);
        return this.success(filename);
      } else {
        return this.fail("请确认图片格式");
      }
    } catch(e) {
      return this.fail("上传失败");
    }
  }
  
  async addFoodAction() {
    let {
      imgUrl,
      name,
      description,
      price,
      stock,
      categoryId,
      shopId
    } = this.post();
    try {
      let row = await this.model('food').add({
        name,
        description,
        price,
        categoryId,
        imgUrl,
        stock,
        shopId
      })
      return this.success(row);
    } catch(e) {
      return this.fail("添加失败")
    }
  }

  async updateFoodAction() {
    let {
      id,
      imgUrl,
      name,
      description,
      price,
      stock,
      categoryId
    } = this.post();
    try {
      await this.model('food').where({
        id
      }).update({
        name,
        description,
        price,
        categoryId,
        stock,
        imgUrl
      })
      return this.success('修改成功');
    } catch(e) {
      return this.fail("修改失败")
    }
  }

  async deleteFoodAction() {
    let {id} = this.post();
    try {
      let model = this.model('food');
      let food = model.where({id}).find();
      const filename = food.imgUrl;
      let row = await this.model('food').where({
        id
      }).delete();
      fs.unlink(path.join(think.ROOT_PATH, `www/static/${filename}`));
      return this.success("删除成功")
    } catch(e) {
      return this.fail("删除失败");
    }
  }

  async getCategoryAction() {
    let {shopId} = this.post();
    try {
      let categorys = await this.model('food_category').where({
        shopId
      }).select();
      return this.success(categorys)
    } catch(e) {
      console.log(e)
      return this.fail(e);
    }
  }

  async queryMultiFoodAction() {
    let list = this.post('list');
    try {
      let foods = await this.model('food').where({
        id: ['in', list]
      }).select();
      return this.success(foods);
    } catch(e) {
      return this.fail(e);
    }
  }
}