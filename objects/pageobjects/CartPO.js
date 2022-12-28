const {Locator} = require('../../Utils/Locator/Locator');
const {expect} = require("@playwright/test");

class CartPO{

    constructor(page) {
        this.page = page;
        this.locator = new Locator(this.page);
    }

 async removeProductAndGoToHomePage(){
        await this.locator.removeProduct.click();
        await expect(this.locator.noProductText).toHaveText('No Products in Your Cart !');
        await this.locator.homePageBtn.click();
 }

 async verifyAddedProductIsVisibleInCart(productName){
     await this.locator.productinCartVisible.waitFor();
     expect(await this.locator.getLocatorByText('h3',productName).isVisible());
     //navigate to Checkout
     await this.navigateToCheckOut();
 }

    async navigateToCheckOut() {
        await this.locator.getLocatorByText('button', 'Checkout').click();
    }

}

module.exports={CartPO};
