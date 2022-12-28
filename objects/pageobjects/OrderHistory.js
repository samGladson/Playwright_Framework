const {Locator} = require('../../Utils/Locator/Locator');
const {expect} = require("@playwright/test");

class OrderHistory{
    constructor(page) {
        this.page = page;
        this.locator =new Locator(this.page);
    }


    async viewLastOrder(orderNo){
        const totalElements =  await this.locator.getOrderNos.count();
        for(let i=0;i<totalElements;i++){
            if(await this.locator.getOrderNos.nth(i).textContent() == orderNo){
                await this.locator.orderViewBtn.nth(i).click();
                await this.locator.orderSummaryTitle.waitFor();
                break;
            };
        };
        await expect(this.locator.orderNoInSummary).toHaveText(orderNo.toString());
    }

}

module.exports = {OrderHistory};