const {Locator} = require('../../Utils/Locator/Locator');

class DashboardPO{

     constructor(page) {
         this.page = page;
         this.locator = new Locator(this.page);
    }

    async selectProduct(productName){
        await this.locator.productList.first().waitFor();
        const cardLocator = this.locator.productList;
        const count = (await cardLocator.allTextContents()).length;
        for(let i=0;i<count;i++){
            if(await cardLocator.nth(i).locator('b').textContent()==productName){
                await cardLocator.nth(i).locator('text= Add To Cart').click();
                break;
            };
        };
        //navigate to cart
        await this.navigateToCart()
    }

    async navigateToCart(){
        await this.locator.cartBtn.click();
    }

}

module.exports = {DashboardPO};