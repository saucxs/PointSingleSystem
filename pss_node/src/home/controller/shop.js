const Base = require('./base');
module.exports = class extends Base {
  async getAllAction() {
    let {userId} = this.post();
    try {
      let raw = await this.model('shop').where({
        userId
      }).select();
      return this.success(raw);
    } catch(e) {
      return this.fail("获取失败");
    }
  }
  async addShopAction() {
    let { userId, name, info } = this.post();
    try {
      let shopId = await this.model('shop').add({
        name,
        info,
        userId
      });
      return this.success(shopId);
    } catch(e) {
      return this.fail("添加失败");
    }
  }

  async deleteShopAction() {
    let {id} = this.post();
    try {
      let userInfo = await this.session('userInfo');
      let row = await this.model('shop').where({
        id,
        userId: userInfo.userId
      }).delete();
      if (row)
        return this.success("删除成功");
      else {
        return this.fail("没有该用户下的该商户");
      }
    } catch(e) {
      return this.fail("删除失败")
    }
  }

  async updateShopAction() {
    let {id, name, info} = this.post();
    try {
      await this.model('shop').where({
        id
      }).update({
        name,
        info
      });
      return this.success("修改成功");
    } catch(e) {
      return this.fail("修改失败",e);
    }
  }
}