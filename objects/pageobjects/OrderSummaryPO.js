const {Locator} = require('../../Utils/Locator/Locator');
const {expect} = require("@playwright/test");

class OrderSummaryPO{
    constructor(page) {
        this.page = page;
        this.locator =new Locator(this.page);

    }

    async placeOrderAndStoreOrderNo(){
        await this.locator.placeOrder.click();
        await this.locator.orderSummaryLink.waitFor();
        expect(await this.locator.thankYouMsg.isVisible()).toBeTruthy();
        const fullText = await this.locator.orderNoText.textContent();
        const orderArray = fullText.split(" ");

        //navigate to order history
        await this.goToOrder();
        return orderArray[2];
    }

    async goToOrder(){
        await this.locator.orderBtn.click();
        await this.locator.orderPageVisible.waitFor();
    }

}

module.exports = {OrderSummaryPO};