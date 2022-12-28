const {UserLoginAndRegister} = require('./UserLoginAndRegister')
const {ProductAPI} = require('./ProductAPI')
const {PlaceOrderAPI} = require('./PlaceOrderAPI')
const {OrderAPI} = require('./OrderAPI')

class APIMethods {

    constructor(context, baseURL) {
        this.context = context;
        this.base = baseURL;
        this.userRegAndLogin = new UserLoginAndRegister(this.context,this.base)
        this.productAPI = new ProductAPI(this.context,this.base)
        this.placeOrderAPI = new PlaceOrderAPI(this.context,this.base)
        this.orderAPI = new OrderAPI(this.context,this.base)
    }

    getUserRegAndLoginAPI(){
        return this.userRegAndLogin;
    }

    getProductAPI(){
        return this.productAPI;
    }

    getPlaceOrderAPI(){
        return this.placeOrderAPI;
    }

    getOrdersAPI(){
        return this.orderAPI;
    }
}

module.exports = {APIMethods}