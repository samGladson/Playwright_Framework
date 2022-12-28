const {UserLoginAndRegister} = require('./UserLoginAndRegister')
const {ProductAPI} = require('./ProductAPI')
const {PlaceOrderAPI} = require('./PlaceOrderAPI')
class APIMethods {

    constructor(context, baseURL) {
        this.context = context;
        this.base = baseURL;
        this.userRegAndLogin = new UserLoginAndRegister(this.context,this.base)
        this.productAPI = new ProductAPI(this.context,this.base)
    }

    getUserRegAndLoginAPI(){
        return this.userRegAndLogin;
    }

    getProductAPI(){
        return this.productAPI;
    }
}

module.exports = {APIMethods}