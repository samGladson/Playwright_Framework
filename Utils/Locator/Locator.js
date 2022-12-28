class Locator{
    constructor(page){
        this.page = page;
        this.userEmail = page.locator('#userEmail');
        this.userPassword = page.locator('#userPassword');
        this.loginBtn = page.locator("input#login");
        this.productList = page.locator('.card-body');
        this.removeProduct = page.locator('button.btn-danger');
        this.noProductText = page.locator("[style*='light']");
        this.homePageBtn = page.locator('.btn-custom .fa-home');
        this.cartBtn = page.locator('.btn-custom .fa-shopping-cart');
        this.productinCartVisible = page.locator('.cartSection h3');
        this.enterCVV = page.locator("div.small input[class='input txt']");
        this.enterDetails = page.locator("div.field input[class='input txt']");
        this.enterCoupon = page.locator("input[name='coupon']");
        this.applyCouponBtn = page.locator(".btn-primary");
        this.couponApplied = page.locator("[style*=green]");
        this.userEmailInCheckout = page.locator('label[style*= lightgray]');
        this.selectCountry = page.locator("input[placeholder='Select Country']");
        this.countryDropdown = page.locator('span.ng-star-inserted');
        this.placeOrder = page.locator('a.action__submit');
        this.orderSummaryLink = page.locator('label[style*=blue]');
        this.thankYouMsg = page.locator('h1.hero-primary');
        this.orderNoText = page.locator('label.ng-star-inserted');
        this.orderBtn = page.locator('i.fa-handshake-o');
        this.orderPageVisible = page.locator('h1.ng-star-inserted');
        this.getOrderNos = page.locator('tr.ng-star-inserted th');
        this.orderViewBtn = page.locator('tr.ng-star-inserted button.btn-primary');
        this.orderSummaryTitle = page.locator('div.email-title');
        this.orderNoInSummary = page.locator("div.col-text");

    }

    getLocatorByText(tagname ,text){
        return this.page.locator(""+tagname+""+":has-Text('"+text+"')");
        console.log("Locator : "+""+tagname+""+":has-Text('"+text+"')")
    }
}
module.exports={Locator};