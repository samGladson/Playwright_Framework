const {test} = require('@playwright/test');
const {APIMethods} = require('../objects/apiObjects/APIMethods')
const loginData = JSON.parse(JSON.stringify(require('../Utils/data/login.json')));
const addToCartPayload = require('../Utils/data/addToCartDTO/addingItemsToCart')
const registerUser = JSON.parse(JSON.stringify(require('../Utils/data/register.json')));

let apiContext ='';
let randomNumber = (Math.floor((Math.random() * 10000000))).toString();

test.describe.configure({mode:"serial"});

test.beforeEach(async ({request,baseURL}) => {
    apiContext = await new APIMethods(request,baseURL)

})

test('@API Create an user via API',async () =>{
   registerUser.userEmail = "gladson.sam"+randomNumber+"@mailinator.com";
   console.log(registerUser)
   await apiContext.getUserRegAndLoginAPI().register(registerUser);
   loginData.userEmail = registerUser.userEmail;
})

test('@API Login via API and add product to the cart',async () =>{
    console.log(loginData)
    const loginResponse = await apiContext.getUserRegAndLoginAPI().login(loginData);
    const getProductResponse = await apiContext.getProductAPI().getAllProducts(loginResponse);
    addToCartPayload._id = loginResponse.userId;
    addToCartPayload.product = getProductResponse[1];
    await apiContext.getProductAPI().addProductToCart(loginResponse,addToCartPayload);
})

test('@API Delete a Product from cart', async ()=>{
    console.log(loginData)
    const loginResponse = await apiContext.getUserRegAndLoginAPI().login(loginData);
    const checkProductIsInCart = await apiContext.getProductAPI().getCartProductCount(loginResponse);
    let productResponse ;
    console.log(checkProductIsInCart)
    if(checkProductIsInCart.message == "No Product in Cart"){
        productResponse = await getAndAddProductToCart(loginResponse);
    }
    await apiContext.getProductAPI().deleteProductFromCart(loginResponse,productResponse);
})


const getAndAddProductToCart= async (loginResponse)=>{
    const getProductResponse = await apiContext.getProductAPI().getAllProducts(loginResponse);
    addToCartPayload._id = loginResponse.userId;
    addToCartPayload.product = getProductResponse[1];
    await apiContext.getProductAPI().addProductToCart(loginResponse,addToCartPayload);
    return getProductResponse[1];
}