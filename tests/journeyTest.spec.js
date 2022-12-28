const {test, expect} = require("@playwright/test");
const loginData = JSON.parse(JSON.stringify(require('../Utils/data/login.json')));
const { POManager } = require('../objects/POManager');
const {APIMethods} = require("../objects/apiObjects/APIMethods");
const loginData = JSON.parse(JSON.stringify(require('../Utils/data/login.json')));
const addToCartPayload = require('../Utils/data/addToCartDTO/addingItemsToCart')
const registerUser = JSON.parse(JSON.stringify(require('../Utils/data/register.json')));
const placeOrderData = JSON.parse(JSON.stringify(require('../Utils/data/placeOrder.json')));


const productName = 'iphone 13 pro';
let orderNo = '';
let poManager= '';
let apiContext='';
const cvv = '018';
const username = 'Sam Gladson'
const country = 'Turkmenistan'
const coupon ='rahulshettyacademy';
let randomNumber = (Math.floor((Math.random() * 10000000))).toString();

test.beforeEach(async ({page,request,baseURL}) => {
    poManager = new POManager(page);
    apiContext = await new APIMethods(request,baseURL)

});

test('@Smoke @UI E2E Journey of an User', async ({}) => {
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

test('@Smoke @API E2E Journey using API' ,async () =>{
    registerUser.userEmail = "gladson.sam"+randomNumber+"@mailinator.com";
    await apiContext.getUserRegAndLoginAPI().register(registerUser);
    loginData.userEmail = registerUser.userEmail;
    const login = await apiContext.getUserRegAndLoginAPI().login(loginData);
    const getProductResponse = await apiContext.getProductAPI().getAllProducts(login);
    addToCartPayload._id = login.userId;
    addToCartPayload.product = getProductResponse[1];
    await apiContext.getProductAPI().addProductToCart(login,addToCartPayload);
    placeOrderData.productOrderedId = addToCartPayload.product._id;
    await apiContext.getPlaceOrderAPI().placeOrder(login,placeOrderData)

})

