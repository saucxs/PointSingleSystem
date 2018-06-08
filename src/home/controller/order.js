const Base = require('./base');
module.exports = class extends Base {
  async indexAction() {
    // get 
    let {id, shopId} = this.post();
    if(id) {
      let order = await this.model('order').where({
        id
      }).find();
      return this.success(order);
    } else if(shopId) {
      let orders = this.model('order').where({
        shopId
      }).select();
      return this.success(orders);
    }
  }
  async addOrderAction() {
    let {content,tablenum,price} = this.post();
    try {
      console.log(content)
      let timestamp = new Date().getTime();
      await this.model('order').add({
        time: timestamp,
        status: 0,
        tablenum:tablenum,
        content: JSON.stringify(content),
        price:price
      })
      return this.success()
    } catch(e) {

    }
  }

  async getOrderAction() {
        let {id, status, foodName, tablenum} = this.post();
        if(!tablenum){
            let orders = await this.model('order').select();
            return this.success(orders);
        }
  }

  async deleteOrderAction() {
        let {id} = this.post();
        try {
            let model = this.model('order');
            let order = model.where({id}).find();
            let row = await this.model('order').where({
                id
            }).delete();
            return this.success("删除成功")
        } catch(e) {
            return this.fail("删除失败");
        }
  }

}