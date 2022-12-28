const {Locator} = require('../../Utils/Locator/Locator');

class LoginPO{

     constructor(page) {
        this.page = page;
        this.locator = new Locator(this.page);
    }

    async Login(username,password){
        await this.locator.userEmail.type(username);
        await this.locator.userPassword.type(password);
        await this.locator.loginBtn.click();
    }

    async goToLoginPage(){
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }
}

module.exports={LoginPO};