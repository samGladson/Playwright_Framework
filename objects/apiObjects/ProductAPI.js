const {expect} = require("@playwright/test");

class ProductAPI{
    constructor(context, baseURL) {
        this.context = context;
        this.base = baseURL;
    }

    async getAllProducts(response) {
        const getAllProductResponse = await this.context.post(this.base + "/product/get-all-products", {
            headers: {
                'Authorization': response.token
            }
        });

        console.log(getAllProductResponse.status())
        const apiGetProductResponse = await getAllProductResponse.json();
        await expect(apiGetProductResponse.message).toEqual('All Products fetched Successfully');
        await expect(getAllProductResponse.ok()).toBeTruthy();
        console.log('Data : ' + apiGetProductResponse.data);
        return apiGetProductResponse.data;
    }

    async addProductToCart(response, cartData) {
        const addToCartResponse = await this.context.post(this.base + "/user/add-to-cart", {
            data: cartData,
            headers: {
                'Authorization': response.token
            }
        });
        const addProductJson = await addToCartResponse.json();
        await expect(addProductJson.message).toEqual('Product Added To Cart');
        await expect(addToCartResponse.ok()).toBeTruthy();
    }

    async deleteProductFromCart(response , cartData){
        const deleteProductResponse = await this.context.delete(this.base +"/user/remove-from-cart/"+response.userId+"/"+cartData._id,{
            headers: {
                'Authorization': response.token
            }
        });
        const deleteProductJson = await deleteProductResponse.json();
        await expect(deleteProductResponse.ok()).toBeTruthy();
        await expect(deleteProductJson.message).toEqual('Product Removed from cart');
    }

    async getCartProductCount(response){
        const getCartProduct = await this.context.get(this.base +"/user/get-cart-products/"+response.userId,{
            headers: {
                'Authorization': response.token
            }
        });
        const getCartProductJson = await getCartProduct.json();
        await expect(getCartProduct.ok()).toBeTruthy();
        return getCartProductJson;
    }
}

module.exports={ProductAPI}