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
  projects :[
    {
      name : 'firefox',
      use: {
        browserName: 'firefox',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'retain-on-failure'
      }
    },

    {
      name : 'chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        ...devices['Desktop Chrome']
      }
    },
    {
      name : 'safari',
      use: {
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        ...devices['Desktop Safari'],
        baseURL: 'https://rahulshettyacademy.com/api/ecom',
        extraHTTPHeaders :{
          'Accept': 'application/json',
          'Content-Type' :'application/json'
        }
      }

    }
  ]



};

module.exports = config;
