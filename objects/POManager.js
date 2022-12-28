const {LoginPO} = require('./pageobjects/LoginPO');
const {DashboardPO} = require('./pageobjects/DashboardPO')
const {CartPO} = require('./pageobjects/CartPO');
const {CheckoutPO} = require('./pageobjects/CheckoutPO');
const {OrderSummaryPO} = require('./pageobjects/OrderSummaryPO');
const {OrderHistory} = require('./pageobjects/OrderHistory');
const {APIMethods} = require('./apiObjects/APIMethods')

class POManager{

    constructor(page) {
        this.page = page
        this.login = new LoginPO(this.page);
        this.dashboard = new DashboardPO(this.page)
        this.cart = new CartPO(this.page)
        this.checkout = new CheckoutPO(this.page)
        this.orderSummary = new OrderSummaryPO(this.page)
        this.orderHistory = new OrderHistory(this.page)
    }

    getLoginPage()
    {
        return this.login;
    }

    getDashboardPage(){
        return this.dashboard;
    }

    getCartPage(){
        return this.cart;
    }

    getCheckoutPage(){
        return this.checkout;
    }

    getOrderSummaryPage(){
        return this.orderSummary;
    }

    getOrderHistory(){
        return this.orderHistory;
    }
}

module.exports = {POManager};