const {test, expect} = require("@playwright/test");
const loginData = JSON.parse(JSON.stringify(require('../Utils/data/login.json')));
const {APIMethods} = require('../objects/apiObjects/APIMethods')


const productName = 'iphone 13 pro';
let orderNo = '';


test.describe("Select Product via different ways of login",()=>
{
    test("Login via UI", async ({page}) => {
        await login(page)
        await selectProduct(page);
        await page.locator('.btn-custom .fa-shopping-cart').click();
        await page.locator('.cartSection h3').waitFor();
        expect(await page.locator("h3:has-Text('" + productName + "')").isVisible());
    });

    test("Login via API and Inject the token in local storage",async ({page,request ,baseURL})=>{
        const apiContext = new APIMethods(request , baseURL);
        const response = await apiContext.login(loginData)
        await page.addInitScript(
            tokenValue => window.localStorage.setItem('token',tokenValue),response.token
        )
        await page.goto('https://rahulshettyacademy.com/client/');

        await selectProduct(page);
        await page.locator('.btn-custom .fa-shopping-cart').click();
        await page.locator('.cartSection h3').waitFor();
        expect(await page.locator("h3:has-Text('" + productName + "')").isVisible());
        await page.locator('button:has-Text("Checkout")').click();
        await fillPaymentDetails(page);
        await applyCoupon(page);
        await verifyEmailAndSelectCountry(page);
        await placeOrderAndStoreOrderNumber(page);
        console.log("Order Number : " + orderNo);
        await goToOrders(page);
        await viewLastOrder(page);
    })

})




const login = async (page) => {
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').type(loginData.userEmail);
    await page.locator('#userPassword').fill(loginData.userPassword);
    await page.locator("input#login").click();
}

const selectProduct = async (page) => {
    await page.locator('.card-body').first().waitFor();
    const cardLocator = page.locator('.card-body');
    const count = (await cardLocator.allTextContents()).length;
    for (let i = 0; i < count; i++) {
        if (await cardLocator.nth(i).locator('b').textContent() == productName) {
            await cardLocator.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
}

const removeProduct = async (page) => {
    await page.locator('button.btn-danger').click();
    await expect(page.locator("[style*='light']")).toHaveText('No Products in Your Cart !')
    await page.locator('.btn-custom .fa-home').click();
}

const fillPaymentDetails = async (page) => {
    await page.locator("div.small input[class='input txt']").type('018');
    const count = await page.locator("div.field input[class='input txt']").count();
    console.log(count);
    for (let i = 0; i < count; i++) {
        if ((await page.locator("div.field input[class='input txt']").nth(i).textContent() != '018')) {
            await page.locator("div.field input[class='input txt']").nth(i).fill('Sam Gladson');
            break;
        }
        ;
    }
    ;
}

const applyCoupon = async (page) => {
    await page.locator("input[name='coupon']").type('rahulshettyacademy');
    await page.locator('.btn-primary').click();
    await expect(page.locator("[style*=green]")).toHaveText('* Coupon Applied');
}

const verifyEmailAndSelectCountry = async (page) => {
    await expect(page.locator('label[style*= lightgray]')).toHaveText(loginData.userEmail);
    await page.locator("input[placeholder='Select Country']").type('tur', {delay: 1000});
    const length = await page.locator('span.ng-star-inserted').count();
    for (let i = 0; i < length; i++) {
        if (((await page.locator("span.ng-star-inserted").nth(i).textContent()) == ' Turkmenistan')) {
            await page.locator("span.ng-star-inserted").nth(i).click();
            break;
        }
        ;
    }
    ;
}

const placeOrderAndStoreOrderNumber = async (page) => {
    await page.locator('a.action__submit').click();
    await page.locator('label[style*=blue]').waitFor();
    expect(await page.locator('h1.hero-primary').isVisible()).toBeTruthy();
    const fullText = await page.locator('label.ng-star-inserted').textContent();
    const orderArray = fullText.split(" ");
    orderNo = orderArray[2];
}

const goToOrders = async (page) => {
    await page.locator('i.fa-handshake-o').click();
    await page.locator('h1.ng-star-inserted').waitFor();
}

const viewLastOrder = async (page) => {
    const totalElements = await page.locator('tr.ng-star-inserted th').count();
    for (let i = 0; i < totalElements; i++) {
        if (await page.locator('tr.ng-star-inserted th').nth(i).textContent() == orderNo) {
            await page.locator('tr.ng-star-inserted button.btn-primary').nth(i).click();
            await page.locator('div.email-title').waitFor();
            break;
        }
        ;
    }
    ;
    await expect(page.locator("div.col-text")).toHaveText(orderNo.toString());
}


