const {expect} = require("@playwright/test");

class OrderAPI{
    constructor(context, baseURL) {
        this.context = context;
        this.base = baseURL;
    }

    async getOrdersForCustomer(response){
        const getOrdersResponse =await this.context.get(this.base+"/order/get-orders-for-customer/"+response.userId,{
            headers:{
                Authorization : response.token,
            }
        });
        expect(await getOrdersResponse.ok()).toBeTruthy();
        const getOrderResponseJson = await getOrdersResponse.json();
        return getOrderResponseJson;
    }

    async getOrderByOrderId(response , orderId){
        const getOrderByIdResponse =await this.context.get(this.base+"/order/get-orders-details",{
            params:{
                id : orderId
            },
            headers:{
                Authorization : response.token,
            }
        });
        expect(await getOrderByIdResponse.ok()).toBeTruthy();
        const getOrderByIdResponseJson = await getOrderByIdResponse.json();
        await expect(getOrderByIdResponseJson[0].orderById).toEqual(response.userId);
    }

    async deleteOrder(response,orderId){
        const deleteOrderResponse = await this.context.delete(this.base +"/order/delete-order/"+orderId,{
            headers: {
                'Authorization': response.token
            }
        });
        const deleteOrderJson = await deleteOrderResponse.json();
        await expect(deleteOrderResponse.ok()).toBeTruthy();
        await expect(deleteOrderJson.message).toEqual("Orders Deleted Successfully");
    }
}

module.exports={OrderAPI}