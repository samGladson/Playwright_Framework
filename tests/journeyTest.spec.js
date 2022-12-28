const {test, expect} = require("@playwright/test");
const loginData = JSON.parse(JSON.stringify(require('../Utils/data/login.json')));
const { POManager } = require('../objects/POManager');

const productName = 'iphone 13 pro';
let orderNo = '';
let poManager= '';
const cvv = '018';
const username = 'Sam Gladson'
const country = 'Turkmenistan'
const coupon ='rahulshettyacademy';

test.beforeEach(async ({page}) => {
    poManager = new POManager(page);
});

test('E2E Journey of an User', async ({page}) => {
    await poManager.getLoginPage().goToLoginPage();
    await poManager.getLoginPage().Login(loginData.userEmail,loginData.userPassword);
    await poManager.getDashboardPage().selectProduct(productName);
    await poManager.getCartPage().verifyAddedProductIsVisibleInCart(productName);
    await poManager.getCheckoutPage().fillPaymentDetails(username,cvv);
    await poManager.getCheckoutPage().applyCoupon(coupon);
    await poManager.getCheckoutPage().verifyEmailAndSelectCountry(loginData.userEmail,country);
    orderNo = await poManager.getOrderSummaryPage().placeOrderAndStoreOrderNo();
    await poManager.getOrderHistory().viewLastOrder(orderNo);
})

test('Intercept Cart page for server error' ,async () =>{

})