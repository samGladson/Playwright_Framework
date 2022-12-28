const {expect} = require("@playwright/test");

class UserLoginAndRegister{

    constructor(context, baseURL) {
        this.context = context;
        this.base = baseURL;
    }

    async register(registerData){
        const url = this.base +  "/auth/register";
        const registerResponse = await this.context.post(url,{
            data : registerData
        });
        const registerResponseJson = await registerResponse.json();
        await expect(registerResponse.ok()).toBeTruthy();
        await expect(registerResponseJson.message).toEqual('Registered Successfully');
    }

    async login(loginDataSet) {
        let response = {};
        const url = this.base + "/auth/login";

        const loginResponse = await this.context.post(url, {
            data: loginDataSet

        });
        const jsonLoginResponse = await loginResponse.json();
        response.token = jsonLoginResponse.token;
        response.userId = jsonLoginResponse.userId;
        await expect(loginResponse.ok()).toBeTruthy();
        await expect(jsonLoginResponse.message).toEqual('Login Successfully');
        return response;
    }
}

module.exports = {UserLoginAndRegister};