const Base = require('../../common/controller/base');
module.exports = class extends Base {
  async __before() {
    console.log("in home base");
    let user = await this.session("userInfo");
    if(user) {
      this.user = user;
    } else {
      return this.fail("登录超期");
    }
  }
};
