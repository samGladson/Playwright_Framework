// @ts-check
const { devices, chromium, firefox} = require('@playwright/test');



/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  retries : 1,
  workers :8,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
   
    timeout: 5000
  },

  reporter: 'html',

      use: {
        baseURL: 'https://rahulshettyacademy.com/api/ecom',
        extraHTTPHeaders :{
          'Accept': 'application/json',
          'Content-Type' :'application/json'
        }
      }




};

module.exports = config;
