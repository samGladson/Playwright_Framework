const {Locator} = require('../../Utils/Locator/Locator');
const {expect} = require("@playwright/test");

class CheckoutPO {

    constructor(page) {
        this.page = page;
        this.locator = new Locator(this.page);
    }


    async fillPaymentDetails(username, cvv) {
        await this.locator.enterCVV.waitFor();
        await this.locator.enterCVV.type(cvv);
        const count = await this.locator.enterDetails.count();
        for (let i = 0; i < count; i++) {
            if ((await this.locator.enterDetails.nth(i).textContent() != cvv)) {
                await this.locator.enterDetails.nth(i).fill(username);
                break;
            };
        };
    }

    async applyCoupon(coupon) {
        await this.locator.enterCoupon.type(coupon);
        await this.locator.applyCouponBtn.click();
        await expect(this.locator.couponApplied).toHaveText('* Coupon Applied');
    }

    async verifyEmailAndSelectCountry(userEmail, country) {
        await expect(this.locator.userEmailInCheckout).toHaveText(userEmail);
        await this.locator.selectCountry.type(country.slice(0,4), {delay: 1000});
        const length = await this.locator.countryDropdown.count();
        for (let i = 0; i < length; i++) {
            if ((await this.locator.countryDropdown.nth(i).textContent()).trim() == country) {
                await this.locator.countryDropdown.nth(i).click();
                break;
            }
            ;
        };
    }

}

module.exports = {CheckoutPO};