
class PlaceOrderAPI{

    constructor(context, baseURL) {
        this.context = context;
        this.base = baseURL;
    }

    async placeOrder(loginResponse ,placeOrderData){
        const orderResponse = await this.context.post(this.base+"/order/create-order",
            {
                data : placeOrderData,
                headers:{
                    'Authorization' :loginResponse.token,
                },

            })
        const orderResponseJson =await orderResponse.json();
        console.log(orderResponseJson);
        return orderResponseJson;
    }

}

module.exports ={PlaceOrderAPI};